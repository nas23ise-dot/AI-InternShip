import React, { useState, useEffect, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImgBlob } from '../utils/cropImage';
import { useAuth } from '../context/AuthContext';
import {
    User as UserIcon,
    Mail,
    Briefcase,
    GraduationCap,
    Save,
    CheckCircle2,
    Plus,
    X,
    Camera,
    Shield,
    Loader2
} from 'lucide-react';
import { db, storage } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { INDIAN_STATES } from '../constants/states';

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        college: user?.education?.college || '',
        degree: user?.education?.degree || '',
        state: user?.profile?.state || '',
    });
    const [skills, setSkills] = useState(user?.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [profilePic, setProfilePic] = useState(user?.photoURL || null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Cropper States
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    useEffect(() => {
        if (user && !uploading) {
            setFormData({
                name: user.name || '',
                college: user.education?.college || '',
                degree: user.education?.degree || '',
                state: user.profile?.state || '',
            });
            setSkills(user.skills || []);

            // Only update profilePic from user if it differs from what we just uploaded
            // or if we have no local profilePic state. This prevents "rollback" flicker.
            if (user.photoURL) {
                setProfilePic(user.photoURL);
            }
        }
    }, [user, uploading]);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Permissive validation
        const isImage = file.type.startsWith('image/') ||
            ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].some(ext => file.name.toLowerCase().endsWith(ext));

        if (!isImage) {
            setMessage('Please select a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImageSrc(reader.result);
            setShowCropper(true);
        });
        reader.readAsDataURL(file);
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSubmit = async () => {
        setUploading(true);
        setShowCropper(false);
        setMessage('Processing and uploading...');

        try {
            console.log('Generating cropped blob...');
            const croppedImageBlob = await getCroppedImgBlob(imageSrc, croppedAreaPixels);

            if (!croppedImageBlob) {
                throw new Error("Could not generate crop. Please try again or use another image.");
            }

            console.log('Cropped blob generated:', croppedImageBlob.size, croppedImageBlob.type);
            const userId = user?.uid || user?.id;

            if (!userId) {
                throw new Error("User ID not found. Please log in again.");
            }

            const storagePath = `profile-pictures/${userId}`;
            const storageRef = ref(storage, storagePath);

            console.log('Uploading to Storage:', storagePath);
            await uploadBytes(storageRef, croppedImageBlob);
            const downloadURL = await getDownloadURL(storageRef);
            const cacheBustedURL = `${downloadURL}${downloadURL.includes('?') ? '&' : '?'}v=${Date.now()}`;

            const userRef = doc(db, 'users', userId);
            await setDoc(userRef, {
                photoURL: cacheBustedURL,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            setProfilePic(cacheBustedURL);
            setMessage('Profile photo updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('CROP AND UPLOAD ERROR:', err);
            setMessage(`Failed to process image: ${err.message}`);
        } finally {
            setUploading(false);
            setImageSrc(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                name: formData.name,
                skills: skills,
                profile: {
                    state: formData.state
                },
                education: {
                    college: formData.college,
                    degree: formData.degree
                }
            });
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update profile.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl space-y-10 pb-20">
            {/* Profile Hero */}
            <header className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-16 text-white shadow-3xl dark:bg-slate-900/50">
                <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:gap-10">
                    <div className="group relative">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-2xl transition-transform hover:scale-105 overflow-hidden">
                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    onError={() => {
                                        console.warn('Profile image failed to load, falling back to initials');
                                        setProfilePic(null);
                                    }}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-4xl font-black">
                                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
                        >
                            {uploading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Camera className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-black tracking-tight">{formData.name || 'Your Name'}</h1>
                        <p className="mt-2 text-xl font-bold text-slate-400">{user?.role || 'Student'} • {user?.email}</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                            <span className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1 text-xs font-bold uppercase backdrop-blur-md">
                                <Shield className="h-3 w-3 text-emerald-400" /> Member since {new Date(user?.metadata?.creationTime).getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Animated Background Polish */}
                <div className="absolute top-0 right-0 h-full w-full pointer-events-none opacity-30">
                    <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-primary/40 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 h-[300px] w-[300px] bg-secondary/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    {/* Personal Info Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[2rem] p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
                            <UserIcon className="h-6 w-6 text-primary" /> Personal Information
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black uppercase text-slate-400">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 font-bold text-slate-900 transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black uppercase text-slate-400">Account Role</label>
                                <input
                                    type="text"
                                    disabled
                                    className="w-full rounded-2xl border-slate-200 bg-slate-100 px-5 py-3 font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900"
                                    value={user?.role?.toUpperCase() || 'STUDENT'}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black uppercase text-slate-400">Selected State (Location-Based Discovery)</label>
                                <select
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 font-bold text-slate-900 transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                >
                                    <option value="">-- Select Your State --</option>
                                    {INDIAN_STATES.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-[2rem] p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
                            <GraduationCap className="h-6 w-6 text-secondary" /> Education
                        </h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black uppercase text-slate-400">College / University</label>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 font-bold text-slate-900 transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    value={formData.college}
                                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black uppercase text-slate-400">Degree / Major</label>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 font-bold text-slate-900 transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    {/* Skills Card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[2rem] p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
                            <Briefcase className="h-6 w-6 text-amber-500" /> Skills
                        </h2>

                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <AnimatePresence>
                                    {skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                        >
                                            {skill}
                                            <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Add a skill..."
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 py-3 pl-4 pr-12 font-bold text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-blue-500/20 active:scale-90"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Save Button & Feedback */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex w-full items-center justify-center gap-2 rounded-[2rem] bg-slate-900 py-6 text-lg font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 dark:bg-primary"
                        >
                            {isSaving ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
                            ) : (
                                <>
                                    <Save className="h-6 w-6" /> SAVE PROFILE
                                </>
                            )}
                        </button>

                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`flex items-center gap-2 rounded-2xl p-4 text-sm font-black shadow-lg ${message.includes('success')
                                            ? 'bg-emerald-500 text-white'
                                            : message.includes('uploading') || message.includes('Processing')
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-red-500 text-white'
                                        }`}
                                >
                                    {message.includes('uploading') || message.includes('Processing') ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="h-5 w-5" />
                                    )}
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </form>

            {/* Photo Cropper Modal */}
            <AnimatePresence>
                {showCropper && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 sm:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl border border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                                <div>
                                    <h3 className="text-xl font-black text-white">Adjust Profile Photo</h3>
                                    <p className="text-sm font-bold text-slate-400 mt-1">Drag to reposition • Scroll to zoom</p>
                                </div>
                                <button
                                    onClick={() => setShowCropper(false)}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Cropper Area */}
                            <div className="relative flex-1 bg-black">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    cropShape="round"
                                    showGrid={false}
                                />
                            </div>

                            {/* Controls */}
                            <div className="bg-slate-900 px-8 py-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <span>Zoom Scale</span>
                                        <span>{Math.round(zoom * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-primary"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowCropper(false)}
                                        className="flex-1 rounded-2xl bg-white/5 py-4 text-sm font-black text-white hover:bg-white/10 transition-all border border-white/5"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={handleCropSubmit}
                                        className="flex-[2] rounded-2xl bg-primary py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Camera className="h-5 w-5" /> APPLY & UPLOAD
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
