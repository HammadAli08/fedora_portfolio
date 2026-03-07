import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [history, setHistory] = useState([]);
    const idRef = useRef(0);
    const queueRef = useRef([]);
    const activeCountRef = useRef(0);

    const MAX_VISIBLE = 3;

    const processQueue = useCallback(() => {
        if (queueRef.current.length === 0 || activeCountRef.current >= MAX_VISIBLE) return;

        const next = queueRef.current.shift();
        activeCountRef.current += 1;

        setToasts(prev => [...prev, next]);
        setHistory(prev => [next, ...prev].slice(0, 50));

        // Auto-dismiss
        setTimeout(() => {
            dismissToast(next.id);
        }, next.duration || 4000);
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
        activeCountRef.current = Math.max(0, activeCountRef.current - 1);

        // Process next in queue after a tiny delay for animation
        setTimeout(() => {
            processQueue();
        }, 300);
    }, [processQueue]);

    const notify = useCallback(({ title, body, icon, type = 'info', duration = 4000, app = null }) => {
        idRef.current += 1;
        const toast = {
            id: idRef.current,
            title,
            body,
            icon,
            type, // 'info' | 'success' | 'guide' | 'welcome'
            duration,
            app, // optional app id to open on click
            timestamp: new Date(),
        };

        queueRef.current.push(toast);
        processQueue();
    }, [processQueue]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    const value = {
        toasts,
        history,
        notify,
        dismissToast,
        clearHistory,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
