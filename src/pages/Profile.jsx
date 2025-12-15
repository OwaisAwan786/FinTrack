import React from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { User, Mail, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useFinTrack();

    const sections = [
        {
            title: 'Account Settings',
            items: [
                { icon: User, label: 'Personal Information', value: user?.name },
                { icon: Mail, label: 'Email Address', value: user?.email },
            ]
        },
        {
            title: 'Security',
            items: [
                { icon: Shield, label: 'Change Password', action: true },
                { icon: Shield, label: 'Two-Factor Authentication', toggle: true },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Bell, label: 'Notifications', toggle: true },
            ]
        }
    ];

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-8 text-center">
                My Profile
            </h2>

            <div className="bg-slate-900/40 rounded-2xl p-8 border border-slate-700/50 shadow-xl mb-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-indigo-600/30">
                    {user?.name?.[0] || 'U'}
                </div>
                <h3 className="text-2xl font-bold">{user?.name}</h3>
                <p className="text-gray-400">{user?.email}</p>
                <div className="mt-4 px-4 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/20">
                    Verified User
                </div>
            </div>

            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="glass-panel p-0 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
                            <h4 className="font-bold text-gray-300">{section.title}</h4>
                        </div>
                        <div className="divide-y divide-slate-700/50">
                            {section.items.map((item, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-slate-800 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-200">{item.label}</div>
                                            {item.value && <div className="text-sm text-gray-500">{item.value}</div>}
                                        </div>
                                    </div>

                                    {item.toggle ? (
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    ) : item.action ? (
                                        <ChevronRight size={20} className="text-gray-600" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all font-semibold"
                >
                    <LogOut size={20} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
