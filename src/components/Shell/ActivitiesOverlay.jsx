import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import { MagnifyingGlass, SquaresFour, ChatDots } from 'phosphor-react';

const appMetadata = {
    about: { title: 'About Me' },
    projects: { title: 'Projects' },
    terminal: { title: 'Terminal' },
    resume: { title: 'Resume' },
    settings: { title: 'Settings' },
    assistant: { title: 'Assistant' },
};

const ActivitiesOverlay = () => {
    const { isActivitiesOpen, setActivitiesOpen, openApps, focusApp, openApp, setChatMessages } = useWindowManager();
    const [searchQuery, setSearchQuery] = useState('');

    if (!isActivitiesOpen) return null;

    const handleAppClick = (appId) => {
        focusApp(appId);
        setActivitiesOpen(false);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            handleAskAssistant();
        }
    };

    const handleAskAssistant = () => {
        setChatMessages(prev => [...prev, { role: 'user', content: searchQuery }]);
        openApp('assistant');
        setSearchQuery('');
        setActivitiesOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-3xl flex flex-col items-center pt-16 px-8"
            onClick={() => setActivitiesOpen(false)}
        >
            {/* Search Bar */}
            <div
                className="w-full max-w-xl relative mb-16"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                    <MagnifyingGlass size={20} weight="bold" />
                </div>
                <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    placeholder="Type to search..."
                    className="w-full h-12 bg-white/10 border border-white/10 rounded-full px-12 py-2 text-white placeholder-white/40 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all text-lg"
                />
            </div>

            {/* Search Results */}
            <AnimatePresence>
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full max-w-xl bg-[#2d2d2d]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden mb-8 scrollbar-hide"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleAskAssistant}
                            className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="w-10 h-10 rounded-full bg-fedora-blue flex items-center justify-center text-white">
                                <div className="w-10 h-10 rounded-full bg-fedora-blue flex items-center justify-center text-white">
                                    <ChatDots size={20} weight="fill" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Ask Hammad Assistant</span>
                                <span className="text-white/40 text-xs">Search for "{searchQuery}" using AI</span>
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Workspaces / Open Windows Preview */}
            <div className="w-full flex justify-center gap-8 mb-20 overflow-x-auto pb-4">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="group relative flex flex-col items-center"
                >
                    <div className="w-[300px] aspect-video bg-[#2d2d2d] rounded-xl border-2 border-white/20 overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
                        <div className="w-full h-full p-2 flex flex-wrap gap-2 content-start">
                            {openApps.map(app => (
                                <div key={app.id} className="w-16 h-12 bg-white/5 rounded border border-white/10" />
                            ))}
                        </div>
                    </div>
                    <span className="mt-2 text-white/60 text-xs font-bold uppercase tracking-widest">Workspace 1</span>
                </motion.div>
            </div>

            {/* Open Windows Grid (Exposé style) */}
            <div className="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-8">
                {openApps.map((app, index) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={(e) => { e.stopPropagation(); handleAppClick(app.id); }}
                        className="group relative aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors shadow-2xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-6 bg-white/5 flex items-center px-3 justify-between">
                            <span className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">
                                {appMetadata[app.id]?.title || app.id}
                            </span>
                        </div>
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <SquaresFour size={48} weight="fill" className="text-white/20 group-hover:text-white/40 transition-colors" />
                            <span className="text-white font-medium">{appMetadata[app.id]?.title || app.id}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ActivitiesOverlay;
