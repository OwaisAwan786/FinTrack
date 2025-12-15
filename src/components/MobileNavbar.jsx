import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Target, BrainCircuit } from 'lucide-react';

const MobileNavbar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/' },
        { icon: Receipt, label: 'Transact', path: '/transactions' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: BrainCircuit, label: 'Advisor', path: '/advisor' },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full p-4 md:hidden z-50">
            <div className="glass-panel flex justify-around items-center p-3 shadow-glow bg-slate-900/90 backdrop-blur-xl border-t border-white/10">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${isActive
                                ? 'text-indigo-400 bg-indigo-500/10 scale-110'
                                : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={22} className={({ isActive }) => isActive ? "fill-current" : "stroke-2"} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileNavbar;
