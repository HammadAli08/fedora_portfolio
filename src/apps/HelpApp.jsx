import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../context/WindowManager';
import {
    ChatDots, User, Files, ChartBar, Terminal, FilePdf, Gear,
    Question, CaretRight, ArrowSquareOut, Keyboard, Info,
    MagnifyingGlass
} from 'phosphor-react';

const appHelp = [
    {
        id: 'assistant',
        name: 'AI Assistant',
        icon: ChatDots,
        color: '#3584e4',
        shortDesc: 'Chat with an AI that knows everything about Hammad.',
        details: [
            'Ask questions about Hammad\'s skills, experience, projects, and background.',
            'The assistant uses a RAG-powered backend to provide accurate, sourced answers.',
            'You can also search from the Activities overlay — your query is sent directly to the assistant.',
            'Conversations are preserved during your session.',
        ],
        tips: [
            'Try asking: "What ML frameworks does Hammad use?"',
            'Try asking: "Tell me about his projects"',
            'You can also type a question in the Activities search bar and press Enter.',
        ],
    },
    {
        id: 'about',
        name: 'About Me',
        icon: User,
        color: '#8b5cf6',
        shortDesc: 'Education, certifications, achievements, and contact info.',
        details: [
            'View Hammad\'s complete professional profile — education, certifications, and achievements.',
            'Find contact information and social links (GitHub, LinkedIn, Email).',
            'Browse through the timeline of key career milestones.',
        ],
        tips: [
            'Scroll down to see all sections.',
            'Click social links to open them in a new tab.',
        ],
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: Files,
        color: '#22c55e',
        shortDesc: 'Browse all projects with live demos and GitHub links.',
        details: [
            'Explore a curated gallery of AI/ML and software projects.',
            'Each project card shows the tech stack, key features, and achievements.',
            'Click "Live Demo" to try the project, or "GitHub" to view the source code.',
        ],
        tips: [
            'Hover over project cards for more details.',
            'Look for achievement badges on competition-winning projects.',
        ],
    },
    {
        id: 'skills',
        name: 'Skills Dashboard',
        icon: ChartBar,
        color: '#ec4899',
        shortDesc: 'Interactive breakdown of all technical skills.',
        details: [
            'Skills are organized into categories: Languages, ML/AI, LLM/NLP, DevOps, and more.',
            'Click on a category to expand and see individual skills.',
            'Visual skill tags give you a quick overview of Hammad\'s technical arsenal.',
        ],
        tips: [
            'Click different category tabs to explore each domain.',
            'Soft skills are included too — check the last category.',
        ],
    },
    {
        id: 'terminal',
        name: 'Terminal',
        icon: Terminal,
        color: '#f59e0b',
        shortDesc: 'Interact with the portfolio like a real Linux system.',
        details: [
            'A fully functional terminal emulator with custom commands.',
            'Run "help" to see all available commands.',
            'Use "neofetch" for a beautiful system info card.',
            'Browse files with "ls" and "cat" commands.',
            'Launch any app by typing its name (e.g., "assistant", "projects").',
        ],
        tips: [
            'neofetch — System info card with Hammad\'s profile',
            'whoami — Quick bio and credentials',
            'ls — List available files',
            'cat about_me.txt — Read profile info',
            'cat skills.json — View skills data',
            'help — Show all commands',
        ],
    },
    {
        id: 'resume',
        name: 'Resume',
        icon: FilePdf,
        color: '#ef4444',
        shortDesc: 'View and download Hammad\'s latest resume as PDF.',
        details: [
            'View the full resume rendered directly in the app.',
            'Download a copy as PDF for offline reference.',
            'Always up-to-date with the latest experience and skills.',
        ],
        tips: [
            'Use the download button to save a PDF copy.',
        ],
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: Gear,
        color: '#6b7280',
        shortDesc: 'Customize wallpapers and explore system info.',
        details: [
            'Change the desktop wallpaper from a collection of options.',
            'Choose between image wallpapers and gradient backgrounds.',
            'View system information about the portfolio build.',
        ],
        tips: [
            'You can also right-click the desktop and select "Change Background..." for quick access.',
        ],
    },
];

const keyboardShortcuts = [
    { keys: 'Right-click Desktop', action: 'Open context menu with quick actions' },
    { keys: 'Click Dock Icon', action: 'Open or focus an application' },
    { keys: 'Activities (top-left)', action: 'Search & see open windows' },
    { keys: 'Calendar (top-right)', action: 'View notification history' },
];

const HelpApp = () => {
    const { openApp } = useWindowManager();
    const [selectedApp, setSelectedApp] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = appHelp.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full bg-[#1e1e1e] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-fedora-blue/20 flex items-center justify-center">
                        <Question size={22} weight="fill" className="text-fedora-blue-light" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Help & Guide</h1>
                        <p className="text-[11px] text-white/40">Learn about all applications in this portfolio</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search apps..."
                        className="w-full h-9 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    {selectedApp ? (
                        /* Detail View */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.2 }}
                            className="p-6"
                        >
                            {/* Back button */}
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-5"
                            >
                                <CaretRight size={12} className="rotate-180" />
                                Back to all apps
                            </button>

                            {/* App header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: `${selectedApp.color}20` }}
                                >
                                    <selectedApp.icon
                                        size={28}
                                        weight="fill"
                                        style={{ color: selectedApp.color }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white">{selectedApp.name}</h2>
                                    <p className="text-sm text-white/50 mt-0.5">{selectedApp.shortDesc}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openApp(selectedApp.id)}
                                    className="px-4 py-2 bg-fedora-blue/20 hover:bg-fedora-blue/30 border border-fedora-blue/30 rounded-xl text-sm font-medium text-fedora-blue-light transition-colors flex items-center gap-2"
                                >
                                    <ArrowSquareOut size={16} />
                                    Open App
                                </motion.button>
                            </div>

                            {/* What it does */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                                    What it does
                                </h3>
                                <div className="space-y-2.5">
                                    {selectedApp.details.map((detail, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-3 text-sm text-white/70"
                                        >
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                                style={{ backgroundColor: selectedApp.color }}
                                            />
                                            {detail}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                                    {selectedApp.id === 'terminal' ? 'Commands' : 'Tips'}
                                </h3>
                                <div className="space-y-2">
                                    {selectedApp.tips.map((tip, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 + i * 0.05 }}
                                            className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl"
                                        >
                                            <Info size={16} className="text-amber-400/70 shrink-0 mt-0.5" />
                                            <span className="text-sm text-white/60 font-mono">{tip}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* List View */
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.2 }}
                            className="p-6"
                        >
                            {/* App cards */}
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                                Applications
                            </h3>
                            <div className="space-y-2 mb-8">
                                {filteredApps.map((app, i) => (
                                    <motion.button
                                        key={app.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        onClick={() => { setSelectedApp(app); setSearchQuery(''); }}
                                        className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all group text-left"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: `${app.color}15` }}
                                        >
                                            <app.icon
                                                size={20}
                                                weight="fill"
                                                style={{ color: app.color }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                                                {app.name}
                                            </div>
                                            <div className="text-[11px] text-white/40 truncate">
                                                {app.shortDesc}
                                            </div>
                                        </div>
                                        <CaretRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors shrink-0" />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Keyboard / Interaction shortcuts */}
                            {!searchQuery && (
                                <>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                                        Quick Actions
                                    </h3>
                                    <div className="space-y-2">
                                        {keyboardShortcuts.map((shortcut, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + i * 0.04 }}
                                                className="flex items-center justify-between gap-4 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl"
                                            >
                                                <span className="text-sm text-white/50">{shortcut.action}</span>
                                                <span className="text-[10px] font-mono bg-white/10 text-white/60 px-2 py-1 rounded-md whitespace-nowrap">
                                                    {shortcut.keys}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HelpApp;
