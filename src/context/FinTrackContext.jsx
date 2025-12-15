import React, { createContext, useContext, useState, useEffect } from 'react';

const FinTrackContext = createContext();

const API_URL = '/api';

export const useFinTrack = () => useContext(FinTrackContext);

export const FinTrackProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('fintrack_user')) || null);
  const [transactions, setTransactions] = useState([]);
  const [savingsPocket, setSavingsPocket] = useState(0);
  const [budget, setBudget] = useState(0);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Auth Methods
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('fintrack_user', JSON.stringify(data.user));
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('fintrack_user', JSON.stringify(data.user));
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fintrack_user');
    setTransactions([]);
    setGoals([]);
    setSavingsPocket(0);
    setBudget(0);
  };

  // Fetch Initial Data (Only if logged in)
  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    fetch(`${API_URL}/data`)
      .then(res => res.json())
      .then(data => {
        setTransactions(data.transactions || []);
        setSavingsPocket(data.savingsPocket || 0);
        setBudget(data.budget || 0);
        setGoals(data.goals || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        addNotification("Failed to connect to server.", "danger");
        setIsLoading(false);
      });
  }, [user]);

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

  const addTransaction = async (transaction) => {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });
      const data = await res.json();

      setTransactions(prev => [data.transaction, ...prev]);

      if (data.autoSaved > 0) {
        setSavingsPocket(data.savingsPocket);
        addNotification(`Auto-saved PKR ${data.autoSaved} to Savings Pocket!`, 'success');
      } else if (transaction.type === 'income') {
        addNotification(`Income received: PKR ${transaction.amount}`, 'success');
      }
    } catch (err) {
      console.error(err);
      addNotification("Failed to save transaction.", "danger");
    }
  };

  const addGoal = async (goal) => {
    try {
      const res = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      });
      const data = await res.json();
      setGoals(prev => [...prev, data.goal]);
      addNotification(`New Goal "${goal.name}" created!`, 'success');
    } catch (err) {
      console.error(err);
      addNotification("Failed to create goal.", "danger");
    }
  };

  const simulateBillPayment = async () => {
    const billAmount = 4500;
    const transaction = {
      title: 'Electricity Bill',
      amount: billAmount,
      category: 'Bills',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    };
    await addTransaction(transaction);
    addNotification(`Automatic Payment: Electricity Bill (PKR ${billAmount}) paid.`, 'warning');
  };

  return (
    <FinTrackContext.Provider value={{
      user,
      login,
      signup,
      logout,
      transactions,
      savingsPocket,
      budget,
      goals,
      notifications,
      isLoading,
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
