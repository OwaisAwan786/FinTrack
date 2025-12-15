import React, { createContext, useContext, useState, useEffect } from 'react';

const FinTrackContext = createContext();

export const useFinTrack = () => useContext(FinTrackContext);

export const FinTrackProvider = ({ children }) => {
  // Initial Mock Data
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Grocery Shopping', amount: 1200, category: 'Food', date: '2023-10-24', type: 'expense' },
    { id: 2, title: 'Uber Ride', amount: 350, category: 'Transport', date: '2023-10-25', type: 'expense' },
    { id: 3, title: 'Freelance Payment', amount: 15000, category: 'Income', date: '2023-10-26', type: 'income' },
  ]);

  const [savingsPocket, setSavingsPocket] = useState(2450); // Accumulated savings
  const [budget, setBudget] = useState(20000); // Monthly Budget
  const [goals, setGoals] = useState([
    { id: 1, name: 'New Laptop', target: 80000, current: 15000, color: '#6366F1' },
    { id: 2, name: 'Emergency Fund', target: 50000, current: 20000, color: '#10B981' },
  ]);

  const calculateTotalBalance = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    return income - expenses;
  };

  const calculateMonthlySpending = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Smart Auto-Save Logic
  // For demonstration: If expense is Rs. 900 out of Rs. 1000 (round up to nearest 100 or 500? User said "Rs.1000 and spend Rs.900, remaining Rs.100 saved")
  // Let's implement a "Round Up" feature. spending 900 -> rounds to 1000 -> 100 saved. 
  // Spending 350 -> rounds to 400 -> 50 saved.
  // Notifications State
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      amount: parseFloat(transaction.amount), // Ensure number
    };
    setTransactions(prev => [newTransaction, ...prev]);

    if (newTransaction.type === 'expense') {
      const amount = newTransaction.amount;
      // Smart Auto-Save: Round up to nearest 500
      // 950 -> 1000 (Save 50)
      // 1900 -> 2000 (Save 100)
      const roundedUp = Math.ceil(amount / 500) * 500;
      const savings = roundedUp - amount;

      if (savings > 0) {
        setSavingsPocket(prev => prev + savings);
        addNotification(`Auto-saved PKR ${savings} to Savings Pocket! (Rounded to ${roundedUp})`, 'success');
      }
    } else if (newTransaction.type === 'income') {
      addNotification(`Income received: PKR ${newTransaction.amount}`, 'success');
    }
  };

  const addGoal = (goal) => {
    setGoals(prev => [...prev, { ...goal, id: Date.now(), current: 0 }]);
    addNotification(`New Goal "${goal.name}" created!`, 'success');
  };

  const simulateBillPayment = () => {
    const billAmount = 4500;
    addTransaction({
      title: 'Electricity Bill',
      amount: billAmount,
      category: 'Bills',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
    addNotification(`Automatic Payment: Electricity Bill (PKR ${billAmount}) paid.`, 'warning');
  };

  return (
    <FinTrackContext.Provider value={{
      transactions,
      savingsPocket,
      budget,
      goals,
      notifications,
      addTransaction,
      addGoal,
      simulateBillPayment,
      totalBalance: calculateTotalBalance(),
      monthlySpending: calculateMonthlySpending(),
    }}>
      {children}
    </FinTrackContext.Provider>
  );
};
