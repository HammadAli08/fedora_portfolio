import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import {
    WifiHigh,
    SpeakerHigh,
    BatteryHigh,
    CaretDown
} from 'phosphor-react';

import CalendarPopover from './CalendarPopover';
import QuickSettingsPopover from './QuickSettingsPopover';

const TopBar = () => {
    const { toggleActivities, isActivitiesOpen } = useWindowManager();
    const [time, setTime] = useState(new Date());
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-between px-3 text-xs font-medium text-white select-none">
            {/* Activities Button */}
            <div className="flex items-center gap-2 h-full">
                <button
                    onClick={toggleActivities}
                    className={`px-3 h-[85%] rounded transition-colors ${isActivitiesOpen ? 'bg-white/15' : 'hover:bg-white/10'
                        }`}
                >
                    Activities
                </button>
            </div>

            {/* Clock & Date */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center">
                <button
                    onClick={() => setCalendarOpen(!isCalendarOpen)}
                    className={`px-3 h-[85%] rounded transition-colors ${isCalendarOpen ? 'bg-white/15' : 'hover:bg-white/10'}`}
                >
                    {formatDate(time)} &nbsp; {formatTime(time)}
                </button>
            </div>

            <AnimatePresence>
                {isCalendarOpen && (
                    <CalendarPopover
                        isOpen={isCalendarOpen}
                        onClose={() => setCalendarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* System Status */}
            <div className="flex items-center gap-1 h-full">
                <button
                    onClick={() => setQuickSettingsOpen(!isQuickSettingsOpen)}
                    className={`flex items-center gap-3 px-3 h-[85%] rounded transition-colors ${isQuickSettingsOpen ? 'bg-white/15' : 'hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-2">
                        <WifiHigh size={16} weight="bold" />
                        <SpeakerHigh size={16} weight="bold" />
                        <BatteryHigh size={16} weight="bold" />
                    </div>
                    <CaretDown size={10} weight="bold" />
                </button>
            </div>

            <AnimatePresence>
                {isQuickSettingsOpen && (
                    <QuickSettingsPopover
                        isOpen={isQuickSettingsOpen}
                        onClose={() => setQuickSettingsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TopBar;
