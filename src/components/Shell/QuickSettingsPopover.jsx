import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    WifiHigh,
    Bluetooth,
    Moon,
    Sun,
    SpeakerHigh,
    Gear,
    Lock,
    Power,
    CaretRight,
    CircleDashed
} from 'phosphor-react';
import { useWindowManager } from '../../context/WindowManager';

const QuickSettingsPopover = ({ isOpen, onClose }) => {
    const { openApp, logout } = useWindowManager();
    const [volume, setVolume] = useState(80);
    const [brightness, setBrightness] = useState(90);
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
    const [nightLight, setNightLight] = useState(false);

    if (!isOpen) return null;

    const QuickToggle = ({ icon: Icon, label, status, active, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${active ? 'bg-fedora-blue text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
        >
            <div className={`p-2 rounded-full ${active ? 'bg-white/20' : 'bg-white/5'}`}>
                <Icon size={18} weight={active ? 'fill' : 'bold'} />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[10px] font-bold truncate w-full text-left">{label}</span>
                <span className={`text-[9px] ${active ? 'text-white/70' : 'text-white/30'}`}>{status}</span>
            </div>
            <CaretRight size={10} className="ml-auto opacity-30" />
        </button>
    );

    return (
        <>
            <div className="fixed inset-0 z-[1001]" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-9 right-3 z-[1002] w-80 bg-[#2d2d2d]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sliders Container */}
                <div className="space-y-4 px-2">
                    <div className="flex items-center gap-4">
                        <SpeakerHigh size={18} className="text-white/60" />
                        <input
                            type="range"
                            min="0" max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="flex-1 accent-fedora-blue h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Sun size={18} className="text-white/60" />
                        <input
                            type="range"
                            min="0" max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                            className="flex-1 accent-fedora-blue h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                {/* Grid of Toggles */}
                <div className="grid grid-cols-2 gap-3">
                    <QuickToggle
                        icon={WifiHigh}
                        label="Wi-Fi"
                        status={wifiEnabled ? 'Connected' : 'Off'}
                        active={wifiEnabled}
                        onClick={() => setWifiEnabled(!wifiEnabled)}
                    />
                    <QuickToggle
                        icon={Bluetooth}
                        label="Bluetooth"
                        status={bluetoothEnabled ? 'On' : 'Off'}
                        active={bluetoothEnabled}
                        onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                    />
                    <QuickToggle
                        icon={Moon}
                        label="Night Light"
                        status={nightLight ? 'On' : 'Off'}
                        active={nightLight}
                        onClick={() => setNightLight(!nightLight)}
                    />
                    <QuickToggle
                        icon={CircleDashed}
                        label="Dark Mode"
                        status="On"
                        active={true}
                    />
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { openApp('settings'); onClose(); }}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/80"
                        >
                            <Gear size={18} weight="bold" />
                        </button>
                        <button
                            onClick={() => { logout(); onClose(); }}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/80"
                        >
                            <Lock size={18} weight="bold" />
                        </button>
                    </div>

                    <button
                        onClick={() => { logout(); onClose(); }}
                        className="p-3 bg-white/5 hover:bg-[#ef4444] rounded-full transition-colors text-white/80 group"
                    >
                        <Power size={18} weight="bold" className="group-hover:text-white" />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default QuickSettingsPopover;
