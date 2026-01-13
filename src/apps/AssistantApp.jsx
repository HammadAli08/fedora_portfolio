import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight, ChatDots, User, Robot, CircleNotch } from 'phosphor-react';
// import ReactMarkdown from 'react-markdown';
import { useWindowManager } from '../context/WindowManager';

const AssistantApp = () => {
    const { chatMessages, setChatMessages } = useWindowManager();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const triggerAssistantResponse = async (messageContent) => {
        setIsTyping(true);
        const assistantMessageId = Date.now();
        setChatMessages(prev => [...prev, { role: 'assistant', content: '', id: assistantMessageId }]);

        try {
            // Replace with your actual Render backend URL
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://portfolio-backend-hammad.onrender.com';
            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageContent, stream: true })
            });

            if (!response.ok) throw new Error('Failed to connect to assistant');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullResponse += chunk;

                setChatMessages(prev => prev.map(msg =>
                    msg.id === assistantMessageId ? { ...msg, content: fullResponse } : msg
                ));
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setChatMessages(prev => prev.map(msg =>
                msg.id === assistantMessageId
                    ? { ...msg, content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later." }
                    : msg
            ));
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
        // Handle auto-response for messages sent from Activities Search
        const lastMessage = chatMessages[chatMessages.length - 1];
        if (lastMessage?.role === 'user' && !isTyping) {
            triggerAssistantResponse(lastMessage.content);
        }
    }, [chatMessages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = { role: 'user', content: input };
        setChatMessages(prev => [...prev, userMessage]);
        setInput('');
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence initial={false}>
                    {chatMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id || i}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-fedora-blue' : 'bg-white/10 border border-white/10'
                                }`}>
                                {msg.role === 'user' ? <User size={16} weight="bold" /> : <Robot size={16} weight="bold" />}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-fedora-blue text-white rounded-tr-none shadow-lg'
                                : 'bg-white/5 border border-white/5 rounded-tl-none'
                                }`}>
                                {/* <ReactMarkdown
                                    className="prose prose-invert prose-sm max-w-none"
                                    components={{
                                        p: ({ children }) => <p className="mb-0">{children}</p>,
                                        code: ({ children }) => <code className="bg-black/30 px-1 rounded text-fedora-blue-light">{children}</code>
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown> */}
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                {msg.role === 'assistant' && msg.content === '' && (
                                    <CircleNotch size={14} className="animate-spin opacity-40" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#2d2d2d] border-t border-white/5">
                <form onSubmit={handleSend} className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about Hammad..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-fedora-blue focus:ring-4 focus:ring-fedora-blue/10 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-fedora-blue hover:bg-fedora-blue-light text-white rounded-xl disabled:opacity-30 disabled:hover:bg-fedora-blue transition-all"
                    >
                        <PaperPlaneRight size={20} weight="fill" />
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    <ChatDots size={12} weight="fill" className="text-fedora-blue" />
                    Powered by HammadOS RAG Pipeline
                </div>
            </div>
        </div>
    );
};

export default AssistantApp;
