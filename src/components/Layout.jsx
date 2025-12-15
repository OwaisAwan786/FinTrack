import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationToast from './NotificationToast';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px]" />
            </div>

            <Sidebar />
            <NotificationToast />

            <main className="md:pl-72 p-6 min-h-screen">
                <div className="max-w-7xl mx-auto animate-fade-in relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
