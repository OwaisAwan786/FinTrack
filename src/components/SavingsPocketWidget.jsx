import React from 'react';
import { Wallet, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const SavingsPocketWidget = ({ balance }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-glow transition-transform hover:-translate-y-1">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                        <Wallet size={24} className="text-indigo-100" />
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                        <Sparkles size={12} className="text-green-300" />
                        <span className="text-xs font-bold text-green-200">Auto-Save Active</span>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-indigo-200 font-medium mb-1">Savings Pocket</p>
                    <h2 className="text-3xl font-bold tracking-tight">{typeof balance === 'number' ? formatCurrency(balance) : balance}</h2>
                    <p className="text-xs text-indigo-300 mt-2 opacity-80">
                        Smartly saved from your daily spends.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SavingsPocketWidget;
