import React, { useState } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { Zap, Wifi, Smartphone, Droplet, CheckCircle, Loader } from 'lucide-react';

const Bills = () => {
    const { addTransaction, totalBalance } = useFinTrack();
    const [loading, setLoading] = useState(null);
    const [success, setSuccess] = useState(null);

    const bills = [
        { id: 1, name: 'Electricity Bill', provider: 'IESCO', amount: 4500, icon: Zap, color: 'text-yellow-400', dueDate: '15 Dec 2025' },
        { id: 2, name: 'Internet', provider: 'Nayatel', amount: 2500, icon: Wifi, color: 'text-blue-400', dueDate: '20 Dec 2025' },
        { id: 3, name: 'Mobile Postpaid', provider: 'Jazz', amount: 1200, icon: Smartphone, color: 'text-green-400', dueDate: '22 Dec 2025' },
        { id: 4, name: 'Water Bill', provider: 'CDA', amount: 800, icon: Droplet, color: 'text-cyan-400', dueDate: '25 Dec 2025' },
    ];

    const payBill = async (bill) => {
        setLoading(bill.id);

        setTimeout(async () => {
            await addTransaction({
                title: `${bill.name} (${bill.provider})`,
                amount: bill.amount,
                category: 'Bills',
                date: new Date().toISOString().split('T')[0],
                type: 'expense'
            });
            setLoading(null);
            setSuccess(bill.id);
            setTimeout(() => setSuccess(null), 3000);
        }, 1500);
    };

    return (
        <div className="pb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-1">
                Bill Payments
            </h2>
            <p className="text-gray-400 mb-8">Manage and pay your utility bills instantly.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bills.map((bill) => {
                    const Icon = bill.icon;
                    const isPaying = loading === bill.id;
                    const isPaid = success === bill.id;

                    return (
                        <div key={bill.id} className="card p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-full bg-slate-800 ${bill.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-xs bg-slate-800 text-gray-400 px-2 py-1 rounded-full">Due: {bill.dueDate}</span>
                                </div>
                                <h3 className="font-bold text-lg">{bill.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{bill.provider}</p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                                <span className="font-bold text-xl">PKR {Number(bill.amount).toLocaleString()}</span>
                                <button
                                    onClick={() => payBill(bill)}
                                    disabled={isPaying || isPaid || totalBalance < bill.amount}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${isPaid
                                            ? 'bg-green-500/10 text-green-400 cursor-default'
                                            : totalBalance < bill.amount
                                                ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'
                                        }`}
                                >
                                    {isPaying ? <Loader className="animate-spin" size={16} /> :
                                        isPaid ? <><CheckCircle size={16} /> Paid</> : 'Pay Now'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Auto Pay Section */}
            <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Scheduled Payments</h3>
                <div className="glass-panel p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 text-red-500 rounded-full">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Electricity Auto-Pay</h4>
                            <p className="text-sm text-gray-400">Scheduled for 1st of every month</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-500 text-sm font-medium">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bills;
