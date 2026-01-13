import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import { X, Minus, CornersOut, CornersIn } from 'phosphor-react';

const WindowFrame = ({ app, children }) => {
    const {
        activeApp,
        focusApp,
        closeApp,
        toggleMinimize,
        toggleMaximize,
        zIndices
    } = useWindowManager();

    const isActive = activeApp === app.id;
    const isMaximized = app.isMaximized;

    const handleFocus = () => {
        if (!isActive) focusApp(app.id);
    };

    return (
        <AnimatePresence>
            {!app.isMinimized && (
                <Rnd
                    default={{
                        x: 100 + (zIndices[app.id] % 10) * 30,
                        y: 100 + (zIndices[app.id] % 10) * 30,
                        width: 800,
                        height: 600,
                    }}
                    size={isMaximized ? { width: '100%', height: '100%' } : undefined}
                    position={isMaximized ? { x: 0, y: 0 } : undefined}
                    disableDragging={isMaximized}
                    enableResizing={!isMaximized}
                    minWidth={400}
                    minHeight={300}
                    bounds="parent"
                    onDragStart={handleFocus}
                    onResizeStart={handleFocus}
                    style={{ zIndex: zIndices[app.id] ?? 1 }}
                    dragHandleClassName="header-bar"
                    className="window-rnd transition-all duration-300 ease-in-out"
                >
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            borderRadius: isMaximized ? 0 : 12,
                        }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 300,
                            layout: { duration: 0.3 }
                        }}
                        className={`flex flex-col h-full bg-[#242424] overflow-hidden border-[#383838] shadow-2xl transition-shadow ${isMaximized ? 'border-0 shadow-none' : 'border rounded-xl'
                            } ${isActive ? 'ring-1 ring-white/10' : 'opacity-95'}`}
                        onClick={handleFocus}
                    >
                        {/* Header Bar (Libadwaita style) */}
                        <div className={`header-bar h-12 bg-[#303030] flex items-center justify-between px-4 select-none cursor-default active:cursor-grabbing transition-all ${isMaximized ? 'rounded-none border-b border-black/40' : 'rounded-t-xl'
                            }`}>
                            <div className="flex-1" />
                            <div className="text-sm font-semibold text-white/80">{app.title || app.id}</div>
                            <div className="flex-1 flex justify-end items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleMinimize(app.id); }}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <Minus size={14} weight="bold" className="text-white/60" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleMaximize(app.id); }}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                                >
                                    {isMaximized ? (
                                        <CornersIn size={14} weight="bold" className="text-white/60" />
                                    ) : (
                                        <CornersOut size={14} weight="bold" className="text-white/60" />
                                    )}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); closeApp(app.id); }}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#ef4444] transition-colors group"
                                >
                                    <X size={14} weight="bold" className="text-white/60 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-auto bg-[#1e1e1e]">
                            {children}
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </AnimatePresence>
    );
};

export default WindowFrame;
