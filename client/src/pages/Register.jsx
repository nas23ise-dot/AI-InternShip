import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Briefcase, Plus } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES } from '../constants/states';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        skills: '',
        state: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Save additional user info in Firestore
            const userData = {
                uid: user.uid,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                skills: skillsArray,
                profile: {
                    state: formData.state
                },
                createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', user.uid), userData);

            login(userData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg space-y-8 glass p-10 rounded-3xl shadow-2xl animate-fade-in dark:bg-slate-900/50"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                        Join thousands of students tracking their success
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                required
                                className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 transition-all"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 transition-all"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                            type="password"
                            required
                            className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 transition-all"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 transition-all"
                            placeholder="Skills (comma separated: React, Node, SQL)"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-4 py-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">I am a:</label>
                        <select
                            className="rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-sm text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary transition-colors"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin / Recruiter</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Your State:</label>
                        <select
                            required
                            className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 px-4 text-slate-900 dark:text-white focus:border-primary focus:ring-primary transition-all"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        >
                            <option value="">-- Select Your State (Mandatory) --</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="text-center text-sm text-red-500 font-bold">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-xl bg-primary py-3 px-4 text-sm font-bold text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-blue-300 h-12 items-center"
                        >
                            {isLoading ? 'Creating account...' : (
                                <span className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> Sign Up
                                </span>
                            )}
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:text-blue-700">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
