import React from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, CaretRight, BellSlash } from 'phosphor-react';

const CalendarPopover = ({ isOpen, onClose }) => {
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();

    // Helper to get days in month
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());

    const days = [];
    // Padding for first week
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop for closing */}
            <div className="fixed inset-0 z-[1001]" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: -10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -10, x: '-50%' }}
                className="fixed top-9 left-1/2 z-[1002] w-[500px] bg-[#2d2d2d]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Notifications Area (GNOME style) */}
                <div className="w-1/2 border-r border-white/5 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                        <BellSlash size={32} weight="bold" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white/80">No Notifications</h3>
                        <p className="text-[10px] text-white/40 leading-tight px-4">
                            All caught up! You'll see system alerts and messages here.
                        </p>
                    </div>
                </div>

                {/* Calendar Area */}
                <div className="w-1/2 p-6 bg-black/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-white/90">
                            {monthName} {year}
                        </h2>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <CaretLeft size={16} weight="bold" />
                            </button>
                            <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                <CaretRight size={16} weight="bold" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 text-center mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <span key={i} className="text-[10px] font-black text-white/30">{day}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 text-center gap-y-1">
                        {days.map((day, i) => (
                            <div key={i} className="h-8 flex items-center justify-center relative">
                                {day && (
                                    <button
                                        className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-bold transition-all ${day === today.getDate()
                                            ? 'bg-fedora-blue text-white shadow-lg shadow-fedora-blue/40 ring-2 ring-white/20'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-white/40 font-bold uppercase tracking-tight">Events</span>
                        </div>
                        <p className="text-[10px] text-white/20 italic">No events scheduled today.</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CalendarPopover;
