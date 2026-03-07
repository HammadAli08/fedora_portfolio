import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, CaretRight, BellSlash, Bell, Trash, HandWaving, Robot, Folder, Compass, Terminal as TerminalIcon, FilePdf, Gear, User, Info, RocketLaunch } from 'phosphor-react';
import { useNotifications } from '../../context/NotificationContext';

const notifIconMap = {
    welcome: HandWaving,
    guide: Compass,
    assistant: Robot,
    projects: Folder,
    terminal: TerminalIcon,
    resume: FilePdf,
    settings: Gear,
    about: User,
    info: Info,
    rocket: RocketLaunch,
    bell: Bell,
};

const CalendarPopover = ({ isOpen, onClose }) => {
    const { history, clearHistory } = useNotifications();
    const [calendarDate, setCalendarDate] = useState(new Date());
    const today = new Date();

    const monthName = calendarDate.toLocaleString('default', { month: 'long' });
    const year = calendarDate.getFullYear();

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(calendarDate.getMonth(), calendarDate.getFullYear());

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const goToPrevMonth = () => {
        setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const isToday = (day) => {
        return day === today.getDate()
            && calendarDate.getMonth() === today.getMonth()
            && calendarDate.getFullYear() === today.getFullYear();
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

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
                <div className="w-1/2 border-r border-white/5 p-4 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Notifications</h3>
                        {history.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="text-white/30 hover:text-white/60 transition-colors"
                                title="Clear all"
                            >
                                <Trash size={14} weight="bold" />
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                                <BellSlash size={28} weight="bold" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-white/60">No Notifications</h3>
                                <p className="text-[10px] text-white/30 leading-tight px-2">
                                    All caught up!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                            {history.map((notif) => {
                                const NIcon = notifIconMap[notif.icon] || Bell;
                                return (
                                    <div
                                        key={notif.id}
                                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-fedora-blue/15 flex items-center justify-center shrink-0 mt-0.5">
                                            <NIcon size={13} weight="fill" className="text-fedora-blue-light" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[11px] font-bold text-white/80 truncate">{notif.title}</p>
                                            <p className="text-[10px] text-white/40 leading-snug mt-0.5 line-clamp-2">{notif.body}</p>
                                            <span className="text-[9px] text-white/20 mt-1 block">{formatTime(notif.timestamp)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Calendar Area */}
                <div className="w-1/2 p-6 bg-black/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-white/90">
                            {monthName} {year}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={goToPrevMonth} className="p-1 hover:bg-white/10 rounded transition-colors">
                                <CaretLeft size={16} weight="bold" />
                            </button>
                            <button onClick={goToNextMonth} className="p-1 hover:bg-white/10 rounded transition-colors">
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
                                        className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-bold transition-all ${isToday(day)
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
