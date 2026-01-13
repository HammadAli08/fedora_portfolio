import React from 'react';
import { agentData } from '../data/agentData';
import { User, GraduationCap, Medal, ChatTeardropText, Envelope, Phone, LinkedinLogo, GithubLogo, MapPin, Notepad } from 'phosphor-react';

const AboutApp = () => {
    const personalInfo = agentData.find(d => d.name === "Hammad Ali Tahir");
    const certs = agentData.find(d => d.certifications)?.certifications || [];
    const honors = agentData.find(d => d.achievements)?.achievements || [];

    return (
        <div className="h-full bg-[#1e1e1e] text-white flex flex-col md:flex-row overflow-hidden">
            {/* Profile Sidebar */}
            <div className="w-full md:w-72 bg-[#2d2d2d] border-r border-white/5 p-8 flex flex-col items-center flex-shrink-0">
                <div className="w-28 h-28 bg-fedora-blue rounded-full mb-6 flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white/5">
                    <img
                        src="/profile.jpg"
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-xl font-bold text-center mb-1">{personalInfo.name}</h2>
                <p className="text-[10px] text-fedora-blue-light font-bold uppercase tracking-widest text-center mb-8 px-4 leading-tight">
                    {personalInfo.title}
                </p>

                <div className="w-full space-y-4 px-2">
                    <div className="flex items-center gap-3 text-xs text-white/60">
                        <MapPin size={18} className="text-fedora-blue" />
                        <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                        <Envelope size={18} className="text-fedora-blue" />
                        <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-white transition-colors truncate">
                            {personalInfo.contact.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                        <Phone size={18} className="text-fedora-blue" />
                        <span>{personalInfo.contact.phone}</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                        <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors">
                            <LinkedinLogo size={18} /> LinkedIn Profile
                        </a>
                        <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors">
                            <GithubLogo size={18} /> GitHub Projects
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#1e1e1e]">
                <div className="max-w-3xl space-y-12 pb-8">
                    {/* Bio Section */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                            <Notepad size={16} weight="bold" /> The Philosophy
                        </h3>
                        <div className="relative p-6 bg-white/5 rounded-2xl border border-white/5 overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-fedora-blue" />
                            <p className="text-xl font-medium italic text-white/90 leading-relaxed mb-4">
                                "{personalInfo.philosophy}"
                            </p>
                            <p className="text-sm text-secondary/70 leading-relaxed">
                                {personalInfo.specialization}
                            </p>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Education Section */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                                <GraduationCap size={16} weight="bold" /> Education
                            </h3>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                                <h4 className="font-bold text-base mb-1 text-white">{personalInfo.education.degree}</h4>
                                <p className="text-xs text-secondary/60 mb-3">{personalInfo.education.institution}</p>
                                <p className="text-[10px] text-fedora-blue-light font-bold mb-6">{personalInfo.education.duration}</p>

                                <div className="space-y-4">
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Key Coursework</p>
                                    <div className="flex flex-wrap gap-2">
                                        {personalInfo.education.relevant_coursework.map((course, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/60 border border-white/5">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Distinctions / Honors */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                                <Medal size={16} weight="bold" /> Distinctions
                            </h3>
                            <div className="space-y-4">
                                {honors.map((honor, i) => (
                                    <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-4 items-start group hover:bg-white/10 transition-all">
                                        <div className="p-2 bg-fedora-blue/10 rounded-lg text-fedora-blue group-hover:bg-fedora-blue group-hover:text-white transition-colors">
                                            <Medal size={20} weight="bold" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/80 font-medium leading-relaxed">{honor}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Credentials / Certs */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                            <Medal size={16} weight="bold" /> Professional Credentials
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certs.map((cert, i) => (
                                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-fedora-blue" />
                                    <span className="text-xs text-white/60 group-hover:text-white transition-colors">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;
