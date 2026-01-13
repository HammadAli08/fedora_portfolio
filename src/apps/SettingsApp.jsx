import React, { useState } from 'react';
import { Palette, Info, Check } from 'phosphor-react';
import { useWindowManager } from '../context/WindowManager';

const SettingsApp = () => {
    const { wallpaper, setWallpaper } = useWindowManager();
    const [activeTab, setActiveTab] = useState('appearance');

    const wallpapers = [
        { id: 'fedora-default', name: 'Fedora 43 Default', type: 'image', value: '/fedora-wallpaper.jpg' },
        { id: 'oceanic', name: 'Oceanic Blue', type: 'gradient', value: '#1a365d, #0f172a' },
        { id: 'crimson', name: 'Crimson Night', type: 'gradient', value: '#450a0a, #18181b' },
        { id: 'emerald', name: 'Emerald Forest', type: 'gradient', value: '#064e3b, #020617' },
        { id: 'slate', name: 'Deep Slate', type: 'gradient', value: '#1e293b, #020617' },
        { id: 'midnight', name: 'Midnight Aurora', type: 'gradient', value: '#2e1065, #020617' },
    ];

    return (
        <div className="h-full bg-[#1e1e1e] text-white flex">
            {/* Sidebar */}
            <div className="w-56 bg-[#2d2d2d] border-r border-white/5 p-4 flex flex-col gap-1">
                <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-fedora-blue text-white' : 'text-white/60 hover:bg-white/5'
                        }`}
                >
                    <Palette size={20} /> Appearance
                </button>
                <div className="mt-auto pt-4 border-t border-white/5">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'about' ? 'bg-fedora-blue text-white' : 'text-white/60 hover:bg-white/5'
                            }`}
                    >
                        <Info size={20} /> System Info
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'appearance' && (
                    <div className="max-w-2xl space-y-8">
                        <h2 className="text-2xl font-bold">Appearance</h2>

                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-4">Background</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {wallpapers.map((wp) => (
                                    <button
                                        key={wp.id}
                                        onClick={() => setWallpaper(wp)}
                                        className={`group relative aspect-video rounded-xl border-2 transition-all ${wallpaper.id === wp.id ? 'border-fedora-blue ring-4 ring-fedora-blue/20 scale-[1.02]' : 'border-white/10 hover:border-white/30'
                                            } overflow-hidden`}
                                    >
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: wp.type === 'image' ? `url("${wp.value}")` : 'none',
                                                background: wp.type === 'gradient' ? `linear-gradient(135deg, ${wp.value})` : undefined
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{wp.name}</span>
                                        </div>
                                        {wallpaper.id === wp.id && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-fedora-blue rounded-full flex items-center justify-center shadow-lg">
                                                <Check size={12} weight="bold" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </section>

                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="max-w-2xl space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">About System</h2>
                            <div className="px-3 py-1 bg-fedora-blue/20 text-fedora-blue-light rounded-full text-[10px] font-black uppercase tracking-widest">
                                Report Verified
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Hardware Section */}
                            <section className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                                    <Palette size={14} className="opacity-50" />
                                    Hardware Information
                                </div>
                                <div className="space-y-4">
                                    <DetailItem label="Hardware Model" value="HP ProBook 445 G7" />
                                    <DetailItem label="Memory" value="16.0 GiB" />
                                    <DetailItem label="Processor" value="AMD Ryzen™ 5 4500U × 6" />
                                    <DetailItem label="Graphics" value="AMD Radeon™ Graphics" />
                                    <DetailItem label="Disk Capacity" value="256.1 GB" />
                                </div>
                            </section>

                            {/* Software Section */}
                            <section className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                                    <Info size={14} className="opacity-50" />
                                    Software Information
                                </div>
                                <div className="space-y-4">
                                    <DetailItem label="OS Name" value="Fedora Linux 43" />
                                    <DetailItem label="OS Version" value="Workstation Edition" />
                                    <DetailItem label="GNOME Version" value="49" />
                                    <DetailItem label="Windowing System" value="Wayland" />
                                    <DetailItem label="Kernel Version" value="6.17.12-300.fc43" />
                                </div>
                            </section>
                        </div>

                        <div className="bg-fedora-blue/5 p-6 rounded-2xl border border-fedora-blue/10">
                            <h3 className="text-xs font-bold text-fedora-blue-light mb-2">System Details Report</h3>
                            <p className="text-[11px] text-white/40 leading-relaxed italic">
                                Last updated: 2026-01-13 22:38:55. This report contains the definitive technical specifications for this Hammad OS instance.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="space-y-0.5">
        <label className="text-[10px] font-bold text-white/20 block tracking-tight">{label}</label>
        <span className="text-xs font-medium text-white/90">{value}</span>
    </div>
);

export default SettingsApp;
