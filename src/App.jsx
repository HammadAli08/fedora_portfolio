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

        // Welcome notification
        const guideSequence = [
            {
                delay: 800,
                notification: {
                    title: '👋 Welcome back, visitor!',
                    body: 'Welcome to Hammad\'s Portfolio OS. Let me give you a quick tour!',
                    icon: 'welcome',
                    type: 'welcome',
                    duration: 5000,
                },
            },
            {
                delay: 3500,
                notification: {
                    title: '🤖 Meet the AI Assistant',
                    body: 'Chat with an AI that knows everything about Hammad — skills, projects, and experience.',
                    icon: 'assistant',
                    type: 'guide',
                    duration: 5000,
                    app: 'assistant',
                },
            },
            {
                delay: 6500,
                notification: {
                    title: '📂 Explore Projects',
                    body: 'Browse through all projects with live demos and GitHub links.',
                    icon: 'projects',
                    type: 'guide',
                    duration: 5000,
                    app: 'projects',
                },
            },
            {
                delay: 9500,
                notification: {
                    title: '👤 About Hammad',
                    body: 'Check out education, certifications, achievements, and contact info.',
                    icon: 'about',
                    type: 'guide',
                    duration: 5000,
                    app: 'about',
                },
            },
            {
                delay: 12000,
                notification: {
                    title: '📊 Skills Dashboard',
                    body: 'Explore an interactive breakdown of all technical skills — ML frameworks, LLM/NLP, DevOps, and more with proficiency bars!',
                    icon: 'info',
                    type: 'guide',
                    duration: 5000,
                    app: 'skills',
                },
            },
            {
                delay: 14500,
                notification: {
                    title: '💻 Terminal — Your Power Tool',
                    body: 'Open the Terminal to interact with the portfolio like a real Linux system. Click here to launch it!',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 17500,
                notification: {
                    title: '💡 Terminal Tip: "help"',
                    body: 'Type "help" in the terminal to see all available commands and app launchers.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 20500,
                notification: {
                    title: '💡 Terminal Tip: "neofetch"',
                    body: 'Run "neofetch" to see a beautiful system info card with Hammad\'s profile and tech stack.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 23500,
                notification: {
                    title: '💡 Terminal Tip: "whoami" & "skills"',
                    body: 'Use "whoami" to see Hammad\'s bio, or "skills" to open the interactive Skills Dashboard.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 26500,
                notification: {
                    title: '💡 Terminal Tip: Launch Apps',
                    body: 'Type app names like "assistant", "projects", "skills", or "resume" to open them from terminal!',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 29500,
                notification: {
                    title: '💡 Terminal Tip: Browse Files',
                    body: 'Try "ls" to list files, then "cat about_me.txt" or "cat skills.json" to read them.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
            {
                delay: 32500,
                notification: {
                    title: '📄 Download Resume',
                    body: 'View and download Hammad\'s latest resume as PDF.',
                    icon: 'resume',
                    type: 'guide',
                    duration: 5000,
                    app: 'resume',
                },
            },
            {
                delay: 35500,
                notification: {
                    title: '🎨 Customize the Desktop',
                    body: 'Change wallpapers and explore system info in Settings.',
                    icon: 'settings',
                    type: 'guide',
                    duration: 5000,
                    app: 'settings',
                },
            },
            {
                delay: 39000,
                notification: {
                    title: '🚀 You\'re all set!',
                    body: 'Explore freely! Right-click the desktop for shortcuts. All notifications are saved in the calendar panel above!',
                    icon: 'rocket',
                    type: 'success',
                    duration: 6000,
                },
            },
        ];

        const timers = guideSequence.map(({ delay, notification }) =>
            setTimeout(() => notify(notification), delay)
        );

        // Check AI Assistant backend health
        setTimeout(() => {
            fetch('https://portfolio-backend-1lt5.onrender.com/api/health')
                .then(res => {
                    if (res.ok) {
                        notify({
                            title: '🟢 AI Assistant Ready',
                            body: 'Backend connected! The AI Assistant is ready to answer your questions.',
                            icon: 'assistant',
                            type: 'success',
                            duration: 4000,
                            app: 'assistant',
                        });
                    }
                })
                .catch(() => {
                    notify({
                        title: '⚠️ AI Assistant Warming Up',
                        body: 'The backend is starting up. It may take a minute on first visit.',
                        icon: 'assistant',
                        type: 'info',
                        duration: 5000,
                    });
                });
        }, 2000);

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
