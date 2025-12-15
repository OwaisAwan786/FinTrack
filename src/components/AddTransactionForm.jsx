import React, { useState } from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import { Plus, Zap } from 'lucide-react';

const AddTransactionForm = () => {
    const { addTransaction, simulateBillPayment } = useFinTrack();

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        addTransaction({
            ...formData,
            type: 'expense',
        });

        // Reset form
        setFormData({
            title: '',
            amount: '',
            category: 'Food',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className="card h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-white">Add Expense</h3>
                <button
                    onClick={simulateBillPayment}
                    className="text-xs flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                    title="Simulate Electricity Bill Auto-Pay"
                >
                    <Zap size={12} />
                    Simulate Bill Pay
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Grocery, Cinema"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Amount (PKR)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-600"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                        <select
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Food">Food & Dining</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills & Utilities</option>
                            <option value="Health">Health</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Date</label>
                        <input
                            type="date"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4 justify-center">
                    <Plus size={18} />
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
