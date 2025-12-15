import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Target, BrainCircuit, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Receipt, label: 'Transactions', path: '/transactions' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: BrainCircuit, label: 'AI Advisor', path: '/advisor' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 p-4 hidden md:flex flex-col z-50">
            <div className="glass-panel h-full flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        FinTrack
                    </h1>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                    ? 'bg-primary-glow/10 text-white shadow-glow border border-primary-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                            style={({ isActive }) => ({
                                background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 100%)' : '',
                                borderLeft: isActive ? '3px solid #6366F1' : '3px solid transparent'
                            })}
                        >
                            <item.icon size={20} className="stroke-[1.5]" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-gray-700/50 pt-6 mt-6">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all mt-2">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
