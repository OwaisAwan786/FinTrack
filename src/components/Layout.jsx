import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationToast from './NotificationToast';
import { Menu } from 'lucide-react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center p-4 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-40">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white"
                >
                    <Menu size={24} />
                </button>
                <h1 className="ml-3 font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    FinTrack
                </h1>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <NotificationToast />

            <main className="md:pl-72 p-4 md:p-6 min-h-screen">
                <div className="max-w-7xl mx-auto animate-fade-in relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
