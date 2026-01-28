import React, { useState, useEffect } from 'react';
import {
    FileText,
    Trash2,
    Edit3,
    Search,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ApplicationTracker = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) fetchApplications();
    }, [user]);

    const fetchApplications = async () => {
        try {
            const q = query(collection(db, 'applications'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const appsData = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
            setApps(appsData);
        } catch (err) {
            console.error('Error fetching applications', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteApp = async (id) => {
        if (window.confirm('Are you sure you want to remove this application?')) {
            try {
                await deleteDoc(doc(db, 'applications', id));
                setApps(apps.filter(app => app._id !== id));
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Offer': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            case 'Interview': return <Clock className="h-4 w-4 text-amber-500" />;
            case 'Rejected': return <XCircle className="h-4 w-4 text-rose-500" />;
            default: return <AlertCircle className="h-4 w-4 text-blue-500" />;
        }
    };

    const filteredApps = apps.filter(app =>
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 animate-fade-in"
        >
            <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Application Tracker</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Keep track of every step in your career journey.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:w-80 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <div className="glass rounded-3xl overflow-hidden shadow-sm dark:bg-slate-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company & Role</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Follow Up</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <AnimatePresence>
                                {loading ? (
                                    [1, 2, 3].map(i => <tr key={i} className="animate-pulse h-16 bg-white dark:bg-slate-900/50"></tr>)
                                ) : filteredApps.length > 0 ? filteredApps.map((app) => (
                                    <motion.tr
                                        key={app._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">
                                                    {app.company.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{app.role}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{app.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(app.status)}
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{app.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                                <Calendar className="h-4 w-4" />
                                                {app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : 'Set Date'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right space-x-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
                                                <Edit3 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteApp(app._id)}
                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium dark:text-slate-500">
                                            No applications tracked yet. Start applying!
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default ApplicationTracker;
