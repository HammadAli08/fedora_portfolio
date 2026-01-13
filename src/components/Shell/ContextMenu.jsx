import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Gear, TerminalWindow, Folder } from 'phosphor-react';
import { useWindowManager } from '../../context/WindowManager';

const ContextMenu = ({ x, y, isOpen, onClose }) => {
    const menuRef = useRef(null);
    const { openApp } = useWindowManager();

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleAction = (action) => {
        action();
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                style={{ top: y, left: x }}
                className="fixed z-[9999] min-w-[200px] bg-[#303030] border border-[#454545] rounded-xl shadow-2xl py-2 flex flex-col"
            >
                <button
                    onClick={() => handleAction(() => openApp('projects'))}
                    className="px-4 py-2 text-left text-sm text-white hover:bg-[#3584e4] transition-colors flex items-center gap-3"
                >
                    <Folder size={18} /> New Folder
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                    onClick={() => handleAction(() => openApp('terminal'))}
                    className="px-4 py-2 text-left text-sm text-white hover:bg-[#3584e4] transition-colors flex items-center gap-3"
                >
                    <TerminalWindow size={18} /> Open in Terminal
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                    onClick={() => handleAction(() => openApp('settings', { activeTab: 'appearance' }))}
                    className="px-4 py-2 text-left text-sm text-white hover:bg-[#3584e4] transition-colors flex items-center gap-3"
                >
                    <Image size={18} /> Change Background...
                </button>

                <button
                    onClick={() => handleAction(() => openApp('settings'))}
                    className="px-4 py-2 text-left text-sm text-white hover:bg-[#3584e4] transition-colors flex items-center gap-3"
                >
                    <Gear size={18} /> Display Settings
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContextMenu;
