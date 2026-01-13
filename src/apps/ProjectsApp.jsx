import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { agentData } from '../data/agentData';
import { Folder, FileText, Code, CaretRight, GithubLogo, Globe } from 'phosphor-react';

const ProjectsApp = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = agentData.filter(d => d.project_name);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar (Navigation) */}
            <div className="w-48 bg-[#2d2d2d] border-r border-white/5 p-4 space-y-4 select-none">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-black">Places</div>
                <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 bg-fedora-blue/20 text-fedora-blue-light rounded-lg text-sm font-medium">
                        <Folder size={18} weight="fill" />
                        Projects
                    </div>
                </div>
            </div>

            {/* Main Content (File Grid) */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.project_name}
                            onClick={() => setSelectedProject(project)}
                            className={`group flex flex-col items-center p-4 rounded-xl transition-all cursor-pointer ${selectedProject?.project_name === project.project_name
                                ? 'bg-fedora-blue shadow-lg shadow-fedora-blue/20'
                                : 'hover:bg-white/5'
                                }`}
                        >
                            <div className={`p-4 rounded-2xl mb-3 transition-colors ${selectedProject?.project_name === project.project_name
                                ? 'bg-white/20'
                                : 'bg-fedora-blue/10 group-hover:bg-fedora-blue/20'
                                }`}>
                                <Code size={32} weight="bold" className={
                                    selectedProject?.project_name === project.project_name
                                        ? 'text-white'
                                        : 'text-fedora-blue-light'
                                } />
                            </div>
                            <span className="text-xs font-bold text-center leading-tight truncate w-full">
                                {project.project_name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Pane (Libadwaita style right panel) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="w-80 bg-[#2d2d2d] border-l border-white/10 p-6 flex flex-col overflow-y-auto"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold leading-tight">{selectedProject.project_name}</h3>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="text-white/20 hover:text-white"
                            >
                                <CaretRight size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm text-secondary/60 leading-relaxed italic">
                                {selectedProject.notable_aspect}
                            </p>

                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-3">Tech Stack</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech_stack?.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-fedora-blue-light">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-3">Features</div>
                                <ul className="space-y-2">
                                    {selectedProject.features?.map((feature, i) => (
                                        <li key={i} className="text-xs text-secondary/70 flex gap-2">
                                            <span className="text-fedora-blue">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex gap-4">
                                {selectedProject.repository && (
                                    <a
                                        href={selectedProject.repository}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <GithubLogo size={16} /> GitHub
                                    </a>
                                )}
                                {selectedProject.live_demo && (
                                    <a
                                        href={selectedProject.live_demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-3 bg-fedora-blue hover:bg-fedora-blue-light rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Globe size={16} /> Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsApp;
