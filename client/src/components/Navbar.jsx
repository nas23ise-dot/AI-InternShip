import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Briefcase,
    LayoutDashboard,
    Search,
    FileText,
    User,
    LogOut,
    ChevronDown,
    Sparkles,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/jobs', label: 'Jobs', icon: Search },
        { path: '/tracker', label: 'Tracker', icon: FileText },
        { path: '/analyzer', label: 'Analyzer', icon: Sparkles },
        { path: '/bot', label: 'AI Bot', icon: Sparkles },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="sticky top-0 z-50 w-full px-4 py-4">
                <div className="mx-auto max-w-[85rem]">
                    <div className="glass flex items-center justify-between rounded-[2rem] border border-slate-200 px-4 md:px-8 py-3 shadow-2xl backdrop-blur-3xl bg-white/95 dark:bg-slate-900/80 dark:border-slate-800/50 transition-all duration-300">
                        <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight transition-transform active:scale-95 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform overflow-hidden">
                                <img src="/logo.png" alt="Intern-AI Logo" className="h-full w-full object-cover" />
                            </div>
                            <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                                Intern-AI
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center gap-2 md:flex bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-white/10 dark:border-slate-700/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`group relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${isActive(link.path)
                                        ? 'text-white shadow-md'
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                        }`}
                                >
                                    <link.icon className={`h-4 w-4 z-10 ${isActive(link.path) ? 'text-white' : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'}`} />
                                    <span className="z-10">{link.label}</span>
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-blue-500/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {user ? (
                                <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                                    <Link to="/profile" className="flex items-center gap-3 rounded-2xl bg-white/50 p-1.5 pr-5 transition-all hover:bg-white active:scale-95 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-white/40 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 group">
                                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-blue-600 text-[10px] font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div className="hidden flex-col items-start xl:flex">
                                            <span className="text-sm font-black text-slate-800 dark:text-white leading-none mb-0.5">
                                                {user.name?.split(' ')[0] || 'User'}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-primary transition-colors">
                                                {user.role || 'Student'}
                                            </span>
                                        </div>
                                        <ChevronDown className="h-3 w-3 text-slate-400 ml-1 group-hover:translate-y-0.5 transition-transform" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20 border border-transparent hover:border-rose-200 dark:hover:border-rose-900"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 ml-1">
                                    <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors px-2">Login</Link>
                                    <Link to="/register" className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-black hover:-translate-y-0.5 active:scale-95 dark:bg-primary dark:hover:bg-blue-600 dark:shadow-blue-500/20">
                                        Get Started
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeMenu}
                            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 left-0 z-[70] h-full w-[280px] bg-white dark:bg-slate-900 shadow-2xl md:hidden overflow-y-auto"
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                                <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-500/10 overflow-hidden">
                                        <img src="/logo.png" alt="Intern-AI Logo" className="h-full w-full object-cover" />
                                    </div>
                                    <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                                        Intern-AI
                                    </span>
                                </Link>
                                <button
                                    onClick={closeMenu}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* User Profile Section (if logged in) */}
                            {user && (
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                    <Link
                                        to="/profile"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-blue-600 text-sm font-black text-white shadow-lg shadow-blue-500/20">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800 dark:text-white">
                                                {user.name || 'User'}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                {user.role || 'Student'}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <nav className="p-4">
                                <div className="space-y-1">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={closeMenu}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive(link.path)
                                                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-blue-500/20'
                                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <link.icon className="h-5 w-5" />
                                                <span>{link.label}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </nav>

                            {/* Bottom Actions */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/login"
                                            onClick={closeMenu}
                                            className="flex w-full items-center justify-center px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={closeMenu}
                                            className="flex w-full items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
