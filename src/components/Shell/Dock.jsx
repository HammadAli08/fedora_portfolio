import React from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import {
    Terminal,
    Files,
    FilePdf,
    Gear,
    User,
    SquaresFour,
    ChatDots
} from 'phosphor-react';

const DockItem = ({ icon: Icon, label, appId, onClick }) => {
    const { openApps, activeApp } = useWindowManager();
    const isOpen = openApps.some(app => app.id === appId);
    const isActive = activeApp === appId;

    return (
        <div className="relative group flex flex-col items-center">
            <motion.button
                whileHover={{ scale: 1.2, translateY: -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onClick(appId)}
                className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                    }`}
            >
                <Icon size={28} weight="fill" className="text-white" />
            </motion.button>

            {/* Indicator for open apps */}
            {isOpen && (
                <div className={`absolute -bottom-1 w-1 h-1 rounded-full bg-white ${isActive ? 'opacity-100 scale-125' : 'opacity-50'
                    }`} />
            )}

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {label}
            </div>
        </div>
    );
};

const Dock = () => {
    const { openApp, toggleActivities } = useWindowManager();

    const dockApps = [
        { id: 'assistant', label: 'Assistant', icon: ChatDots },
        { id: 'about', label: 'About Me', icon: User },
        { id: 'projects', label: 'Projects', icon: Files },
        { id: 'terminal', label: 'Terminal', icon: Terminal },
        { id: 'resume', label: 'Resume', icon: FilePdf },
        { id: 'settings', label: 'Settings', icon: Gear },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex items-end gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[24px]">
                {dockApps.map((app) => (
                    <DockItem
                        key={app.id}
                        {...app}
                        appId={app.id}
                        onClick={() => openApp(app.id)}
                    />
                ))}

                <div className="w-[1px] h-10 bg-white/10 mx-1 mb-1" />

                <DockItem
                    icon={SquaresFour}
                    label="Show Applications"
                    onClick={toggleActivities}
                />
            </div>
        </div>
    );
};

export default Dock;
