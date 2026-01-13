import React from 'react';
import { FilePdf, DownloadSimple, Eye, Info } from 'phosphor-react';

const ResumeApp = () => {
    const resumeUrl = '/Resume.pdf';

    return (
        <div className="h-full bg-[#f6f6f6] flex flex-col text-black">
            {/* Adwaita Header Bar */}
            <div className="h-14 bg-white border-b border-black/10 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fedora-blue/10 rounded-lg text-fedora-blue">
                        <FilePdf size={20} weight="fill" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold leading-tight">Resume.pdf</h2>
                        <span className="text-[10px] text-black/40 font-medium">Portable Document Format</span>
                    </div>
                </div>

                <a
                    href={resumeUrl}
                    download="Hammad_Ali_Tahir_Resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-fedora-blue hover:bg-fedora-blue-light text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-fedora-blue/20"
                >
                    <DownloadSimple size={16} weight="bold" />
                    Download Resume
                </a>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden flex">
                {/* PDF Preview Pane */}
                <div className="flex-1 bg-[#525659] relative overflow-hidden flex items-center justify-center p-4">
                    <iframe
                        src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full max-w-4xl shadow-2xl rounded-sm"
                        title="Resume Preview"
                    />
                </div>

                {/* Info Sidebar (GTK style) */}
                <div className="w-64 bg-white border-l border-black/5 p-6 space-y-8 select-none overflow-y-auto hidden md:block">
                    <section>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 mb-4">
                            <Info size={14} />
                            Document Info
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-black/40 block mb-1">Owner</label>
                                <span className="text-xs font-medium">Hammad Ali Tahir</span>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-black/40 block mb-1">Last Modified</label>
                                <span className="text-xs font-medium">January 2026</span>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-black/40 block mb-1">Size</label>
                                <span className="text-xs font-medium">Optimized for Web</span>
                            </div>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-black/5">
                        <p className="text-[11px] text-black/50 leading-relaxed italic">
                            Building the Agentic Shift: Bridging Probabilistic Cognition and Deterministic Logic.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ResumeApp;
