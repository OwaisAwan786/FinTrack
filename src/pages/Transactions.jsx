import React from 'react';
import { useFinTrack } from '../context/FinTrackContext';
import TransactionList from '../components/TransactionList';
import AddTransactionForm from '../components/AddTransactionForm';

const Transactions = () => {
    const { transactions } = useFinTrack();

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Transactions
                </h2>
                <p className="text-gray-400 mt-1">Manage your expenses and income.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <TransactionList transactions={transactions} />
                </div>
                <div>
                    <AddTransactionForm />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
