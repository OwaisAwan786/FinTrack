import React, { useState } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { Send, User, CreditCard, CheckCircle, Loader } from 'lucide-react';

const Transfer = () => {
    const { addTransaction, user, totalBalance } = useFinTrack();
    const [recipient, setRecipient] = useState('');
    const [iban, setIban] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network delay
        setTimeout(async () => {
            await addTransaction({
                title: `Transfer to ${recipient}`,
                amount: parseFloat(amount),
                category: 'Transfer',
                date: new Date().toISOString().split('T')[0],
                type: 'expense'
            });
            setLoading(false);
            setSuccess(true);
            setAmount('');
            setRecipient('');
            setIban('');

            // Reset success message
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="pb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-1">
                Transfer Money
            </h2>
            <p className="text-gray-400 mb-8">Send money instantly to anyone, anywhere.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Transfer Form */}
                <div className="card p-8">
                    <form onSubmit={handleTransfer} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Recipient Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">IBAN / Account Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={iban}
                                    onChange={(e) => setIban(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="PK36 MEZN 0000 0000 0000 0000"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Amount (PKR)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">PKR</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="0.00"
                                    min="1"
                                    max={totalBalance}
                                    required
                                />
                            </div>
                            <div className="text-xs text-gray-500 mt-2 text-right">
                                Available Balance: PKR {new Intl.NumberFormat().format(totalBalance)}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || amount > totalBalance}
                            className={`w-full font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${success ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                                } text-white`}
                        >
                            {loading ? (
                                <Loader className="animate-spin" size={20} />
                            ) : success ? (
                                <>
                                    <CheckCircle size={20} /> Sent Successfully!
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Send Money
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Recent Transfers / Info */}
                <div className="flex flex-col gap-6">
                    <div className="card p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
                        <h3 className="font-bold text-lg mb-4 text-indigo-300">Quick Transfer</h3>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {['Ali', 'Sara', 'Mom', 'Dad', 'Work'].map((name, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer group" onClick={() => setRecipient(name)}>
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500 transition-colors">
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-white">{name[0]}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 group-hover:text-indigo-300">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-6">
                        <h3 className="font-bold text-lg mb-4">Transfer Limits</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Daily Limit</span>
                                <span className="text-white font-medium">PKR 250,000</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[15%]"></div>
                            </div>
                            <p className="text-xs text-gray-500">You have used 15% of your daily limit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
