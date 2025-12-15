import React from 'react';
import { ShoppingBag, Coffee, ArrowUpRight, Zap } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const TransactionItem = ({ transaction }) => {
    const getIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'food': return Coffee;
            case 'shopping': return ShoppingBag;
            case 'income': return ArrowUpRight;
            default: return Zap;
        }
    };

    const Icon = getIcon(transaction.category);
    const isIncome = transaction.type === 'income';

    return (
        <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/5 cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                    <Icon size={18} />
                </div>
                <div>
                    <h4 className="font-medium text-gray-200 group-hover:text-white transition-colors">{transaction.title}</h4>
                    <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
                </div>
            </div>
            <div className={`font-semibold ${isIncome ? 'text-green-400' : 'text-gray-200'}`}>
                {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
            </div>
        </div>
    );
};

const TransactionList = ({ transactions }) => {
    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Recent Transactions</h3>
                <button className="text-sm text-primary-color hover:text-indigo-400 transition-colors">View All</button>
            </div>
            <div className="flex flex-col gap-1">
                {transactions.map(t => (
                    <TransactionItem key={t.id} transaction={t} />
                ))}
                {transactions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No transactions yet.</p>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
