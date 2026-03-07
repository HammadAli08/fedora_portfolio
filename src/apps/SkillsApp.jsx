import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code, Brain, Database, Cloud, ChartBar, Lightbulb,
    Users, Robot, TreeStructure, Cube, Terminal, Flask
} from 'phosphor-react';

const skillCategories = [
    {
        id: 'languages',
        name: 'Languages',
        icon: Code,
        color: '#3b82f6',
        skills: ['Python', 'SQL'],
    },
    {
        id: 'ml-ai',
        name: 'ML/AI Frameworks',
        icon: Brain,
        color: '#8b5cf6',
        skills: ['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'XGBoost'],
    },
    {
        id: 'llm-nlp',
        name: 'LLM / NLP',
        icon: Robot,
        color: '#ec4899',
        skills: ['Hugging Face', 'LangChain', 'LangGraph', 'OpenAI API', 'RAG', 'Fine-tuning', 'NLTK'],
    },
    {
        id: 'vector-db',
        name: 'Vector Databases',
        icon: Database,
        color: '#14b8a6',
        skills: ['Pinecone', 'Qdrant', 'ChromaDB'],
    },
    {
        id: 'backend',
        name: 'Backend',
        icon: Terminal,
        color: '#f59e0b',
        skills: ['FastAPI', 'Flask', 'Streamlit', 'RESTful APIs', 'Redis'],
    },
    {
        id: 'devops',
        name: 'DevOps / Cloud',
        icon: Cloud,
        color: '#06b6d4',
        skills: ['Docker', 'Git', 'Render', 'Vercel', 'CI/CD'],
    },
    {
        id: 'data',
        name: 'Data',
        icon: ChartBar,
        color: '#22c55e',
        skills: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering'],
    },
    {
        id: 'concepts',
        name: 'Concepts',
        icon: TreeStructure,
        color: '#f97316',
        skills: ['CNNs', 'NLP', 'Supervised Learning', 'Unsupervised Learning', 'Ensemble Methods', 'Vector Similarity Search'],
    },
    {
        id: 'soft',
        name: 'Soft Skills',
        icon: Users,
        color: '#a78bfa',
        skills: ['Adaptable', 'Fast Learner', 'Strong Communicator', 'Collaborative Team Player'],
    },
];

const SkillCard = ({ name, color, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
                delay: index * 0.07,
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            whileHover={{
                scale: 1.08,
                y: -6,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            className="relative group cursor-default"
        >
            <div
                className="relative px-5 py-4 rounded-2xl border backdrop-blur-sm overflow-hidden transition-shadow duration-300"
                style={{
                    backgroundColor: `${color}08`,
                    borderColor: `${color}20`,
                }}
            >
                {/* Animated glow on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${color}25, transparent 70%)`,
                    }}
                />

                {/* Floating dot indicator */}
                <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: 'easeInOut',
                        }}
                    />
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                        {name}
                    </span>
                </div>

                {/* Shimmer line at bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.07 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </motion.div>
    );
};

const SkillsApp = () => {
    const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);

    const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar */}
            <div className="w-56 bg-[#2d2d2d] border-r border-white/5 p-4 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-4">Categories</div>
                <div className="space-y-1 flex-1">
                    {skillCategories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory.id === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? 'text-white shadow-lg'
                                        : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                }`}
                                style={isActive ? { backgroundColor: `${cat.color}20`, color: cat.color } : {}}
                            >
                                <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                                <span className="truncate">{cat.name}</span>
                                <span className={`ml-auto text-[10px] font-bold rounded-full px-1.5 py-0.5 ${
                                    isActive ? 'bg-white/10' : 'bg-white/5 text-white/30'
                                }`}>
                                    {cat.skills.length}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Stats Footer */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-[10px]">
                        <span className="text-white/30 font-bold">Total Skills</span>
                        <span className="text-white/60 font-bold">{totalSkills}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                        <span className="text-white/30 font-bold">Categories</span>
                        <span className="text-white/60 font-bold">{skillCategories.length}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="max-w-3xl"
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <motion.div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                                style={{ backgroundColor: `${selectedCategory.color}20` }}
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <selectedCategory.icon
                                    size={28}
                                    weight="fill"
                                    style={{ color: selectedCategory.color }}
                                />
                                {/* Pulse ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border-2"
                                    style={{ borderColor: `${selectedCategory.color}40` }}
                                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <div>
                                <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                                <p className="text-xs text-white/40 mt-0.5">
                                    {selectedCategory.skills.length} skill{selectedCategory.skills.length > 1 ? 's' : ''} in this category
                                </p>
                            </div>
                        </div>

                        {/* Skill Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedCategory.skills.map((skill, i) => (
                                <SkillCard
                                    key={skill}
                                    name={skill}
                                    color={selectedCategory.color}
                                    index={i}
                                />
                            ))}
                        </div>

                        {/* All Categories Overview */}
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-6">
                                All Categories at a Glance
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {skillCategories.map((cat) => {
                                    const CatIcon = cat.icon;
                                    const isActive = selectedCategory.id === cat.id;
                                    return (
                                        <motion.button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat)}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                                                isActive
                                                    ? 'border-opacity-50 shadow-lg'
                                                    : 'border-white/5 hover:border-white/15 bg-white/[0.02]'
                                            }`}
                                            style={isActive ? {
                                                borderColor: `${cat.color}50`,
                                                backgroundColor: `${cat.color}10`,
                                            } : {}}
                                        >
                                            <CatIcon
                                                size={16}
                                                weight={isActive ? 'fill' : 'regular'}
                                                style={{ color: isActive ? cat.color : 'rgba(255,255,255,0.3)' }}
                                            />
                                            <span className={`text-[11px] font-bold truncate ${
                                                isActive ? '' : 'text-white/40'
                                            }`} style={isActive ? { color: cat.color } : {}}>
                                                {cat.name}
                                            </span>
                                            <span className="ml-auto text-[9px] font-bold text-white/20">
                                                {cat.skills.length}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillsApp;
