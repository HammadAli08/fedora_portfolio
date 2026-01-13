import React, { useState, useEffect } from 'react';
import { WindowManagerProvider } from './context/WindowManager';
import TopBar from './components/Shell/TopBar';
import Desktop from './components/Shell/Desktop';
import Dock from './components/Shell/Dock';
import ActivitiesOverlay from './components/Shell/ActivitiesOverlay';
import LoginScreen from './components/Shell/LoginScreen';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [bootStep, setBootStep] = useState('booting'); // booting -> login -> desktop

    useEffect(() => {
        // Simulate Fedora boot sequence
        const timer = setTimeout(() => setBootStep('login'), 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = () => {
        setBootStep('desktop');
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#1d1d1d] font-inter">
            {/* Boot Splash */}
            <AnimatePresence>
                {bootStep === 'booting' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-[#242424] text-white"
                    >
                        <div className="w-16 h-16 border-4 border-fedora-blue border-t-transparent rounded-full animate-spin mb-8"></div>
                        <div className="text-sm font-black uppercase tracking-[0.4em] opacity-40 animate-pulse">
                            Fedora Workstation 42
                        </div>
                        <div className="mt-4 text-xs font-mono text-white/20">
                            [ OK ] Started User Manager for UID 1000.<br />
                            [ OK ] Started Session 1 of user hammad.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Screen */}
            <AnimatePresence>
                {bootStep === 'login' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-[5000]"
                    >
                        <LoginScreen onLogin={handleLogin} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Environment */}
            {bootStep === 'desktop' && (
                <WindowManagerProvider onLogout={() => setBootStep('login')}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <TopBar />
                        <Desktop />
                        <Dock />
                        <AnimatePresence>
                            <ActivitiesOverlay />
                        </AnimatePresence>
                    </motion.div>
                </WindowManagerProvider>
            )}
        </div>
    );
}

export default App;
