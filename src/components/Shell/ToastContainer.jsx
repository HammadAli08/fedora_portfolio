import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { useWindowManager } from '../../context/WindowManager';
import {
    Bell, X, RocketLaunch, Robot, Folder, Compass,
    HandWaving, Terminal, FilePdf, Gear, User, Info, ChartBar
} from 'phosphor-react';

const iconMap = {
    welcome: HandWaving,
    guide: Compass,
    assistant: Robot,
    projects: Folder,
    terminal: Terminal,
    resume: FilePdf,
    settings: Gear,
    about: User,
    info: Info,
    rocket: RocketLaunch,
    bell: Bell,
    skills: ChartBar,
};

const typeColors = {
    info: 'border-fedora-blue/30 bg-fedora-blue/5',
    success: 'border-emerald-500/30 bg-emerald-500/5',
    guide: 'border-amber-400/30 bg-amber-400/5',
    welcome: 'border-purple-400/30 bg-purple-400/5',
};

const typeIconBg = {
    info: 'bg-fedora-blue/20 text-fedora-blue-light',
    success: 'bg-emerald-500/20 text-emerald-400',
    guide: 'bg-amber-400/20 text-amber-300',
    welcome: 'bg-purple-400/20 text-purple-300',
};

const ToastContainer = () => {
    const { toasts, dismissToast } = useNotifications();
    const { openApp, setActivitiesOpen } = useWindowManager();

    const handleToastClick = (toast) => {
        if (toast.app) {
            openApp(toast.app);
            setActivitiesOpen(false);
        }
        dismissToast(toast.id);
    };

    return (
        <div className="fixed top-9 left-1/2 -translate-x-1/2 z-[2000] flex flex-col gap-3 w-[380px] pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => {
                    const IconComponent = iconMap[toast.icon] || Bell;
                    const colorClass = typeColors[toast.type] || typeColors.info;
                    const iconBgClass = typeIconBg[toast.type] || typeIconBg.info;

                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                            onClick={() => handleToastClick(toast)}
                            className={`pointer-events-auto cursor-pointer backdrop-blur-xl border rounded-2xl p-4 shadow-2xl shadow-black/40 flex items-start gap-3 group transition-colors hover:bg-white/10 ${colorClass}`}
                            style={{ backgroundColor: 'rgba(45,45,45,0.92)' }}
                        >
                            {/* Icon */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass}`}>
                                <IconComponent size={18} weight="fill" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-xs font-bold text-white truncate">{toast.title}</h4>
                                    <span className="text-[9px] text-white/30 shrink-0">now</span>
                                </div>
                                <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">{toast.body}</p>
                                {toast.app && (
                                    <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-widest text-fedora-blue-light opacity-60">
                                        Click to open →
                                    </span>
                                )}
                            </div>

                            {/* Close */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dismissToast(toast.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white shrink-0 mt-0.5"
                            >
                                <X size={14} weight="bold" />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
