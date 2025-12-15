import React from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationToast = () => {
    const { notifications } = useFinTrack();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            {notifications.map((note) => (
                <div
                    key={note.id}
                    className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border animate-fade-in backdrop-blur-md ${note.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-100' :
                            note.type === 'warning' ? 'bg-amber-500/10 border-amber-500/50 text-amber-100' :
                                'bg-indigo-500/10 border-indigo-500/50 text-indigo-100'
                        }`}
                >
                    {note.type === 'success' && <CheckCircle size={20} className="text-emerald-400" />}
                    {note.type === 'warning' && <AlertCircle size={20} className="text-amber-400" />}
                    {note.type === 'info' && <Info size={20} className="text-indigo-400" />}
                    <span className="font-medium text-sm">{note.message}</span>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
