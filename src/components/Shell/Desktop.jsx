import React, { Suspense, lazy, useState } from 'react';
import { useWindowManager } from '../../context/WindowManager';
import WindowFrame from './WindowFrame';
import ContextMenu from './ContextMenu';

// Lazy load apps
const AboutApp = lazy(() => import('../../apps/AboutApp'));
const ProjectsApp = lazy(() => import('../../apps/ProjectsApp'));
const TerminalApp = lazy(() => import('../../apps/TerminalApp'));
const ResumeApp = lazy(() => import('../../apps/ResumeApp'));
const SettingsApp = lazy(() => import('../../apps/SettingsApp'));
const AssistantApp = lazy(() => import('../../apps/AssistantApp'));

const appMap = {
    about: { title: 'About Me', component: AboutApp },
    projects: { title: 'Projects', component: ProjectsApp },
    terminal: { title: 'Terminal', component: TerminalApp },
    resume: { title: 'Resume', component: ResumeApp },
    settings: { title: 'Settings', component: SettingsApp },
    assistant: { title: 'Assistant', component: AssistantApp },
};

const Desktop = () => {
    const { openApps, wallpaper } = useWindowManager();
    const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({
            isOpen: true,
            x: e.clientX,
            y: e.clientY
        });
    };

    const closeContextMenu = () => {
        setContextMenu({ ...contextMenu, isOpen: false });
    };

    return (
        <div
            className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden bg-cover bg-center transition-all duration-700"
            style={{
                backgroundImage: wallpaper.type === 'image' ? `url("${wallpaper.value}")` : 'none',
                background: wallpaper.type === 'gradient' ? `linear-gradient(135deg, ${wallpaper.value})` : undefined
            }}
            onContextMenu={handleContextMenu}
            onClick={closeContextMenu}
        >
            {/* Context Menu */}
            <ContextMenu
                isOpen={contextMenu.isOpen}
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={closeContextMenu}
            />

            {/* Windows Layer */}
            {openApps.map((app) => {
                const AppInfo = appMap[app.id];
                if (!AppInfo) return null;
                const AppComponent = AppInfo.component;

                return (
                    <WindowFrame key={app.id} app={{ ...app, title: AppInfo.title }}>
                        <Suspense fallback={<div className="flex items-center justify-center h-full text-white/20">Loading...</div>}>
                            <AppComponent />
                        </Suspense>
                    </WindowFrame>
                );
            })}

            {/* Background Decorative Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

export default Desktop;
