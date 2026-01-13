import React, { createContext, useContext, useState, useCallback } from 'react';

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children, onLogout }) => {
    const [openApps, setOpenApps] = useState([]);
    const [activeApp, setActiveApp] = useState(null);
    const [isActivitiesOpen, setActivitiesOpen] = useState(false);
    const [zIndices, setZIndices] = useState({});
    const [wallpaper, setWallpaper] = useState({ id: 'fedora-default', type: 'image', value: '/fedora-wallpaper.jpg' });
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: "Hello! I'm Hammad's Portfolio Assistant. How can I help you today?" }
    ]);

    const focusApp = useCallback((appId) => {
        setActiveApp(appId);
        setZIndices((prev) => {
            const maxZ = Math.max(0, ...Object.values(prev)) + 1;
            return { ...prev, [appId]: maxZ };
        });
    }, []);

    const openApp = useCallback((appId, config = {}) => {
        setOpenApps((prev) => {
            if (prev.some(app => app.id === appId)) return prev;
            return [...prev, { id: appId, isMinimized: false, isMaximized: false, ...config }];
        });
        focusApp(appId);
    }, [focusApp]);

    const closeApp = useCallback((appId) => {
        setOpenApps((prev) => prev.filter(app => app.id !== appId));
        if (activeApp === appId) setActiveApp(null);
    }, [activeApp]);

    const toggleMinimize = useCallback((appId) => {
        setOpenApps((prev) => prev.map(app =>
            app.id === appId ? { ...app, isMinimized: !app.isMinimized } : app
        ));
        if (activeApp === appId) setActiveApp(null);
    }, [activeApp]);

    const toggleMaximize = useCallback((appId) => {
        setOpenApps((prev) => prev.map(app =>
            app.id === appId ? { ...app, isMaximized: !app.isMaximized } : app
        ));
    }, []);

    const toggleActivities = useCallback(() => {
        setActivitiesOpen(prev => !prev);
    }, []);

    const logout = useCallback(() => {
        if (onLogout) onLogout();
    }, [onLogout]);

    const value = {
        openApps,
        activeApp,
        isActivitiesOpen,
        zIndices,
        openApp,
        closeApp,
        focusApp,
        toggleMinimize,
        toggleMaximize,
        toggleActivities,
        setActivitiesOpen,
        wallpaper,
        setWallpaper,
        logout,
        chatMessages,
        setChatMessages
    };

    return (
        <WindowManagerContext.Provider value={value}>
            {children}
        </WindowManagerContext.Provider>
    );
};
