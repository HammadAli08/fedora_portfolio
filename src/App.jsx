import React, { useState, useEffect } from 'react';
import { WindowManagerProvider } from './context/WindowManager';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import TopBar from './components/Shell/TopBar';
import Desktop from './components/Shell/Desktop';
import Dock from './components/Shell/Dock';
import ActivitiesOverlay from './components/Shell/ActivitiesOverlay';
import ToastContainer from './components/Shell/ToastContainer';
import LoginScreen from './components/Shell/LoginScreen';
import { AnimatePresence, motion } from 'framer-motion';

// Inner desktop component that can access NotificationContext
const DesktopEnvironment = ({ onLogout }) => {
    const { notify } = useNotifications();
    const hasGuided = React.useRef(false);

    useEffect(() => {
        if (hasGuided.current) return;
        hasGuided.current = true;

        // Welcome + Assistant notifications only on startup
        const guideSequence = [
            {
                delay: 800,
                notification: {
                    title: '👋 Welcome back, visitor!',
                    body: 'Welcome to Hammad\'s Portfolio OS. Explore apps from the dock, or right-click the desktop for shortcuts!',
                    icon: 'welcome',
                    type: 'welcome',
                    duration: 5000,
                },
            },
            {
                delay: 4000,
                notification: {
                    title: '🤖 Meet the AI Assistant',
                    body: 'Chat with an AI that knows everything about Hammad — skills, projects, and experience. Click to try it!',
                    icon: 'assistant',
                    type: 'guide',
                    duration: 5000,
                    app: 'assistant',
                },
            },
        ];

        const timers = guideSequence.map(({ delay, notification }) =>
            setTimeout(() => notify(notification), delay)
        );

        // Silently check AI backend health — only notify on failure
        setTimeout(() => {
            fetch('https://portfolio-backend-1lt5.onrender.com/api/health')
                .catch(() => {
                    notify({
                        title: '⚠️ AI Assistant Warming Up',
                        body: 'The backend is starting up. It may take a minute on first visit.',
                        icon: 'assistant',
                        type: 'info',
                        duration: 5000,
                    });
                });
        }, 10000);

        return () => timers.forEach(clearTimeout);
    }, [notify]);

    return (
        <WindowManagerProvider onLogout={onLogout}>
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
                <ToastContainer />
            </motion.div>
        </WindowManagerProvider>
    );
};

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
        <NotificationProvider>
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
                    <DesktopEnvironment onLogout={() => setBootStep('login')} />
                )}
            </div>
        </NotificationProvider>
    );
}

export default App;
