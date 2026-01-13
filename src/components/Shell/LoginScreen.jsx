import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Eye, EyeSlash, ArrowRight, Gear, Check } from 'phosphor-react';
import { agentData } from '../../data/agentData';

const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSessionMenu, setShowSessionMenu] = useState(false);
    const [selectedSession, setSelectedSession] = useState('Fedora Workstation 42');

    const menuRef = useRef(null);
    const personalInfo = agentData.find(d => d.name === "Hammad Ali Tahir");

    const sessions = [
        'Fedora Workstation 42',
        'Gnome on Xorg',
        'Gnome Classic',
        'Accessibility Mode'
    ];

    // Live clock update
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowSessionMenu(false);
            }
        };

        if (showSessionMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSessionMenu]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[5000] bg-cover bg-center flex flex-col items-center justify-between py-12 text-white select-none overflow-hidden"
            style={{ backgroundImage: 'url("/fedora-wallpaper.jpg")' }}>

            {/* Blurring Overlay */}
            <div className="absolute inset-0 bg-[#242424]/60 backdrop-blur-xl z-0" />

            {/* Top Bar (Clock) */}
            <div className="relative z-10 flex flex-col items-center mt-12 cursor-default">
                <div className="text-7xl font-bold tracking-tight mb-2">
                    {formatTime(currentTime)}
                </div>
                <div className="text-xl font-medium tracking-wide opacity-90">
                    {formatDate(currentTime)}
                </div>
            </div>

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
                <div className="w-32 h-32 bg-fedora-blue rounded-full mb-6 flex items-center justify-center shadow-2xl border-4 border-white/10 overflow-hidden">
                    <img
                        src="/profile.jpg"
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-6 tracking-wide">{personalInfo.name}</h2>

                <form onSubmit={handleLogin} className="w-full relative group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        className={`w-full bg-[#3d3d3d] text-white placeholder-gray-400 px-4 py-3 pr-12 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-fedora-blue transition-all disabled:opacity-50 ${error ? 'border-red-500 focus:ring-red-500' : 'hover:bg-[#454545]'}`}
                        autoFocus
                        disabled={isLoading}
                    />

                    {/* Password Toggle */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>

                    {/* Submit Arrow or Loading Spinner */}
                    {(password || isLoading) && (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-fedora-blue rounded-full flex items-center justify-center hover:bg-fedora-blue-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <ArrowRight size={20} weight="bold" />
                            )}
                        </button>
                    )}
                </form>

                <p className="mt-8 text-sm text-white/50 italic">Press Enter to unlock</p>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 flex items-center justify-end w-full px-12">
                <div className="relative">
                    <button
                        onClick={() => setShowSessionMenu(!showSessionMenu)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                        <Gear size={24} weight="fill" className="text-white/70 group-hover:text-white" />
                    </button>

                    <AnimatePresence>
                        {showSessionMenu && (
                            <motion.div
                                ref={menuRef}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute bottom-12 right-0 min-w-[200px] bg-[#303030] border border-[#454545] rounded-xl shadow-2xl py-2 flex flex-col z-[5001]"
                            >
                                <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-white/40 font-bold border-b border-white/5 mb-1">
                                    Desktop Session
                                </div>
                                {sessions.map((session) => (
                                    <button
                                        key={session}
                                        onClick={() => {
                                            setSelectedSession(session);
                                            setShowSessionMenu(false);
                                        }}
                                        className="px-4 py-2 text-left text-sm text-white hover:bg-[#3584e4] transition-colors flex items-center justify-between gap-3"
                                    >
                                        {session}
                                        {selectedSession === session && <Check size={14} weight="bold" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
