import React, { useState, useRef, useEffect } from 'react';
import { agentData } from '../data/agentData';

import { useWindowManager } from '../context/WindowManager';
import { useNotifications } from '../context/NotificationContext';

const TerminalApp = () => {
    const { openApp } = useWindowManager();
    const { notify } = useNotifications();
    const [history, setHistory] = useState([
        { type: 'output', content: 'Fedora Workstation 42 (Custom Portfolio Kernel)' },
        { type: 'output', content: 'Welcome hammad@fedora: ~ (Type "help" for commands)' },
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const hasTipped = useRef(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        inputRef.current?.focus();
    }, [history]);

    // Show terminal tips once when the terminal is first opened
    useEffect(() => {
        if (hasTipped.current) return;
        hasTipped.current = true;

        const tips = [
            {
                delay: 500,
                notification: {
                    title: '💡 Tip: "help"',
                    body: 'Type "help" to see all available commands and app launchers.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 4000,
                    app: 'terminal',
                },
            },
            {
                delay: 3500,
                notification: {
                    title: '💡 Tip: "neofetch"',
                    body: 'Run "neofetch" to see a system info card with Hammad\'s profile and tech stack.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 4000,
                    app: 'terminal',
                },
            },
            {
                delay: 6500,
                notification: {
                    title: '💡 Tip: Browse & Launch',
                    body: 'Try "ls" and "cat about_me.txt", or type app names like "assistant" or "projects" to open them.',
                    icon: 'terminal',
                    type: 'guide',
                    duration: 5000,
                    app: 'terminal',
                },
            },
        ];

        const timers = tips.map(({ delay, notification }) =>
            setTimeout(() => notify(notification), delay)
        );

        return () => timers.forEach(clearTimeout);
    }, [notify]);

    const personalInfo = agentData.find(d => d.name === "Hammad Ali Tahir");

    const commands = {
        help: () => [
            'Available commands:',
            '  help      - Show this help message',
            '  neofetch  - Display system info card',
            '  ls        - List project directories',
            '  cat [file]- Display content of a file',
            '  whoami    - Display bio & credentials',
            '  clear     - Clear terminal history',
            '',
            'Applications:',
            '  assistant - Open AI Assistant',
            '  about     - Open About Me',
            '  projects  - Open Projects Gallery',
            '  skills    - Open Skills Dashboard',
            '  resume    - Open Resume',
            '  settings  - Open Settings',
            '  guide     - Open Help & Guide'
        ],
        neofetch: () => {
            const ml = agentData.find(d => d.machine_learning_frameworks)?.machine_learning_frameworks || [];
            const projects = agentData.filter(d => d.project_name);
            return [
                '',
                '        ⬡⬡⬡⬡⬡        hammad@fedora',
                '      ⬡⬡⬡⬡⬡⬡⬡⬡      ─────────────────────────',
                '    ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡    OS: HammadOS (Fedora 43)',
                '   ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡   Host: Portfolio v2.0',
                '  ⬡⬡⬡⬡⬡  ⬡⬡  ⬡⬡⬡⬡⬡  Kernel: React 18 + Vite',
                '  ⬡⬡⬡⬡⬡      ⬡⬡⬡⬡⬡  DE: GNOME 49 / Libadwaita',
                '  ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡  WM: WindowManager.jsx',
                '  ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡  Shell: Tailwind CSS',
                '   ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡   Terminal: TerminalApp',
                '    ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡    ─────────────────────────',
                `      ⬡⬡⬡⬡⬡⬡⬡⬡      User: ${personalInfo.name}`,
                `        ⬡⬡⬡⬡⬡        Title: ${personalInfo.title}`,
                `                       Projects: ${projects.length}`,
                `                       ML Stack: ${ml.slice(0, 4).join(', ')}`,
                `                       Focus: Agentic AI & RAG`,
                `                       Philosophy: ${personalInfo.philosophy}`,
                '',
                '  ■ ■ ■ ■ ■ ■ ■ ■    (color palette)',
                '',
            ];
        },
        whoami: () => [
            `User: ${personalInfo.name}`,
            `Title: ${personalInfo.title}`,
            `Philosophy: ${personalInfo.philosophy}`,
            `Role: AI/ML Engineer`
        ],
        ls: () => [
            'about_me.txt',
            'skills.json',
            'projects/',
            'contact_info.vcf'
        ],
        cat: (args) => {
            const file = args[0];
            if (!file) return ['Usage: cat [filename]'];
            if (file === 'about_me.txt') return [personalInfo.specialization, personalInfo.philosophy];
            if (file === 'skills.json') return [JSON.stringify(agentData.find(d => d.machine_learning_frameworks), null, 2)];
            return [`cat: ${file}: No such file or directory`];
        },
        clear: () => {
            setHistory([]);
            return [];
        },
        // App Commands
        assistant: () => {
            openApp('assistant');
            return ['Launching Assistant...'];
        },
        about: () => {
            openApp('about');
            return ['Launching About Me...'];
        },
        projects: () => {
            openApp('projects');
            return ['Opening Projects Gallery...'];
        },
        resume: () => {
            openApp('resume');
            return ['Opening Resume...'];
        },
        skills: () => {
            openApp('skills');
            return ['Launching Skills Dashboard...'];
        },
        settings: () => {
            openApp('settings');
            return ['Launching Settings...'];
        },
        guide: () => {
            openApp('help');
            return ['Opening Help & Guide...'];
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const [cmd, ...args] = input.trim().toLowerCase().split(' ');
        const newHistory = [...history, { type: 'input', content: `[hammad@fedora ~]$ ${input}` }];

        if (commands[cmd]) {
            const output = commands[cmd](args);
            if (cmd !== 'clear') {
                setHistory([...newHistory, ...output.map(line => ({ type: 'output', content: line }))]);
            }
        } else {
            setHistory([...newHistory, { type: 'output', content: `bash: ${cmd}: command not found` }]);
        }

        setInput('');
    };

    return (
        <div
            className="relative h-full font-mono text-sm overflow-y-auto custom-scrollbar"
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            style={{ backgroundColor: '#0d1117', scrollBehavior: 'smooth' }}
        >
            {/* Subtle gradient glow — pure CSS, no animation overhead */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#3584e4]/[0.06] rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#8b5cf6]/[0.05] rounded-full blur-[100px]" />
            </div>

            {/* Scanline overlay — lightweight CSS pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
                }}
            />

            <div className="relative z-10 p-4 space-y-1">
                {history.map((line, i) => (
                    <div
                        key={i}
                        className={
                            line.type === 'input'
                                ? 'text-[#58a6ff]'
                                : 'text-[#8b949e]'
                        }
                    >
                        {line.content}
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-[#3fb950]">[hammad@fedora ~]$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-[#e6edf3] focus:ring-0 p-0 caret-[#3fb950]"
                        autoFocus
                    />
                </form>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default TerminalApp;
