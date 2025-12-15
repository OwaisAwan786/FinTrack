import React, { useState } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { CreditCard, Plus, Lock, Eye, EyeOff, Wifi, Copy } from 'lucide-react';

const Cards = () => {
    const { user } = useFinTrack();
    const [showDetails, setShowDetails] = useState(false);
    const [frozen, setFrozen] = useState(false);

    const cards = [
        {
            id: 1,
            type: 'VISA',
            number: '4532 1234 5678 9012',
            expiry: '12/28',
            cvv: '123',
            color: 'from-purple-600 to-indigo-600',
            balance: 145000,
            status: 'Active'
        },
        // We could add more cards here
    ];

    const toggleFrozen = () => setFrozen(!frozen);

    return (
        <div className="pb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-1">
                My Cards
            </h2>
            <p className="text-gray-400 mb-8">Manage your physical and virtual cards.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Visual Card Representation */}
                <div className="flex flex-col items-center gap-8">
                    {/* The Card */}
                    <div className={`relative w-96 h-56 rounded-2xl p-6 text-white shadow-2xl transition-all duration-500 transform ${frozen ? 'grayscale brightness-75' : 'bg-gradient-to-br ' + cards[0].color} `}>
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl opacity-30 pointer-events-none">
                            <div className="absolute -right-10 -bottom-20 w-60 h-60 rounded-full border-[30px] border-white/20"></div>
                            <div className="absolute -left-10 -top-20 w-60 h-60 rounded-full border-[30px] border-white/10"></div>
                        </div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold tracking-wider text-xl italic">{cards[0].type}</h3>
                                <Wifi className="rotate-90 opacity-70" size={24} />
                            </div>

                            <div className="mt-4">
                                <div className="text-2xl font-mono tracking-widest drop-shadow-md">
                                    {showDetails ? cards[0].number : '•••• •••• •••• ' + cards[0].number.slice(-4)}
                                </div>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <div className="text-xs opacity-70 mb-1">Card Holder</div>
                                    <div className="font-medium tracking-wide uppercase">{user?.name || 'USER NAME'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs opacity-70 mb-1">Expires</div>
                                    <div className="font-mono">{cards[0].expiry}</div>
                                </div>
                            </div>
                        </div>

                        {frozen && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl z-20">
                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20">
                                    <Lock size={32} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 transition-colors w-24 border border-slate-700 hover:border-indigo-500/50"
                        >
                            {showDetails ? <EyeOff size={24} className="text-indigo-400" /> : <Eye size={24} className="text-indigo-400" />}
                            <span className="text-xs font-medium text-gray-400">{showDetails ? 'Hide' : 'Show'}</span>
                        </button>

                        <button
                            onClick={toggleFrozen}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors w-24 border ${frozen ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-800 hover:border-red-500/30'}`}
                        >
                            <Lock size={24} className={frozen ? 'text-red-500' : 'text-gray-400'} />
                            <span className={`text-xs font-medium ${frozen ? 'text-red-400' : 'text-gray-400'}`}>{frozen ? 'Unfreeze' : 'Freeze'}</span>
                        </button>
                    </div>
                </div>

                {/* Card Settings / Limits */}
                <div className="flex flex-col gap-6">
                    <div className="glass-panel p-6">
                        <h3 className="font-bold text-lg mb-4">Card Settings</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Online Payments</h4>
                                    <p className="text-xs text-gray-400">Enable transactions on websites/apps</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={!frozen} disabled={frozen} />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Contactless Requests</h4>
                                    <p className="text-xs text-gray-400">Tap to pay functionality</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={!frozen} disabled={frozen} />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6">
                        <h3 className="font-bold text-lg mb-4">Spending Limits</h3>
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-gray-400">Monthly Limit</span>
                            <span className="text-white">PKR 500,000</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[65%]"></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">You've spent 65% of your monthly limit.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
