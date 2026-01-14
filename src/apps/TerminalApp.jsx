import React, { useState, useRef, useEffect } from 'react';
import { agentData } from '../data/agentData';

import { useWindowManager } from '../context/WindowManager';

const TerminalApp = () => {
    const { openApp } = useWindowManager();
    const [history, setHistory] = useState([
        { type: 'output', content: 'Fedora Workstation 42 (Custom Portfolio Kernel)' },
        { type: 'output', content: 'Welcome hammad@fedora: ~ (Type "help" for commands)' },
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        inputRef.current?.focus();
    }, [history]);

    const personalInfo = agentData.find(d => d.name === "Hammad Ali Tahir");

    const commands = {
        help: () => [
            'Available commands:',
            '  help      - Show this help message',
            '  ls        - List project directories',
            '  cat [file]- Display content of a file',
            '  whoami    - Display bio & credentials',
            '  skills    - Display technical arsenal',
            '  clear     - Clear terminal history',
            '',
            'Applications:',
            '  assistant - Open AI Assistant',
            '  about     - Open About Me',
            '  projects  - Open Projects Gallery',
            '  resume    - Open Resume',
            '  settings  - Open Settings'
        ],
        whoami: () => [
            `User: ${personalInfo.name}`,
            `Title: ${personalInfo.title}`,
            `Philosophy: ${personalInfo.philosophy}`,
            `Role: ${personalInfo.role}`
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
        skills: () => {
            const ml = agentData.find(d => d.machine_learning_frameworks)?.machine_learning_frameworks || [];
            const nlp = agentData.find(d => d.nlp_llm_technologies)?.nlp_llm_technologies || [];
            return ['--- Machine Learning ---', ...ml, '', '--- NLP & LLMs ---', ...nlp];
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
        settings: () => {
            openApp('settings');
            return ['Launching Settings...'];
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
            className="h-full bg-[#1e1e1e] p-4 font-mono text-sm overflow-y-auto custom-scrollbar"
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
        >
            <div className="space-y-1">
                {history.map((line, i) => (
                    <div
                        key={i}
                        className={line.type === 'input' ? 'text-fedora-blue-light' : 'text-secondary/80'}
                    >
                        {line.content}
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-[#34d399]">[hammad@fedora ~]$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default TerminalApp;
