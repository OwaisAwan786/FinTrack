import React, { createContext, useContext, useState, useEffect } from 'react';

const FinTrackContext = createContext();



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

  // Mock Data Generators
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Auth Methods
  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple mock validation (accept any non-empty credentials for demo)
    if (email && password) {
      const mockUser = { id: 'user_123', name: 'Demo User', email };
      setUser(mockUser);
      localStorage.setItem('fintrack_user', JSON.stringify(mockUser));
      return true;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (name, email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (name && email && password) {
      const mockUser = { id: `user_${Date.now()}`, name, email };
      setUser(mockUser);
      localStorage.setItem('fintrack_user', JSON.stringify(mockUser));
      return true;
    } else {
      throw new Error("Invalid data");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fintrack_user');
    localStorage.removeItem('fintrack_transactions');
    localStorage.removeItem('fintrack_goals');
    localStorage.removeItem('fintrack_pocket');
    localStorage.removeItem('fintrack_budget');

    setTransactions([]);
    setGoals([]);
    setSavingsPocket(0);
    setBudget(0);
  };

  // Load Data from LocalStorage (Simulating Server Database)
  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      try {
        let storedTransactions = JSON.parse(localStorage.getItem('fintrack_transactions'));
        let storedGoals = JSON.parse(localStorage.getItem('fintrack_goals'));
        let storedBudget = JSON.parse(localStorage.getItem('fintrack_budget'));
        let storedPocket = JSON.parse(localStorage.getItem('fintrack_pocket'));

        // If no data exists, load dummy data
        if (!storedTransactions || storedTransactions.length === 0) {
          const dummyTransactions = [
            { id: 't1', title: 'Salary', amount: 50000, category: 'Income', date: new Date().toISOString().split('T')[0], type: 'income' },
            { id: 't2', title: 'Groceries', amount: 3500, category: 'Food', date: new Date().toISOString().split('T')[0], type: 'expense' },
            { id: 't3', title: 'Internet Bill', amount: 4500, category: 'Bills', date: new Date().toISOString().split('T')[0], type: 'expense' },
            { id: 't4', title: 'Coffee', amount: 450, category: 'Food', date: new Date().toISOString().split('T')[0], type: 'expense' }
          ];
          const dummyGoals = [{ id: 'g1', name: 'New Laptop', target: 150000, saved: 25000, deadline: '2025-12-31' }];
          const dummyBudget = 20000;
          const dummyPocket = 5000;

          storedTransactions = dummyTransactions;
          storedGoals = dummyGoals;
          storedBudget = dummyBudget;
          storedPocket = dummyPocket;

          // Save dummy data to local storage so it persists
          localStorage.setItem('fintrack_transactions', JSON.stringify(dummyTransactions));
          localStorage.setItem('fintrack_goals', JSON.stringify(dummyGoals));
          localStorage.setItem('fintrack_budget', JSON.stringify(dummyBudget));
          localStorage.setItem('fintrack_pocket', JSON.stringify(dummyPocket));
        }

        setTransactions(storedTransactions || []);
        setGoals(storedGoals || []);
        setBudget(storedBudget || 0);
        setSavingsPocket(storedPocket || 0);
      } catch (err) {
        console.error("Failed to load local data", err);
        addNotification("Failed to load data.", "danger");
      } finally {
        setIsLoading(false);
      }
    }, 500);
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const newTransaction = { ...transaction, id: generateId() };
      const updatedTransactions = [newTransaction, ...transactions];

      setTransactions(updatedTransactions);
      localStorage.setItem('fintrack_transactions', JSON.stringify(updatedTransactions));

      // Auto-save logic (Mocking server logic)
      if (transaction.type === 'income') {
        const autoSaveAmount = transaction.amount * 0.20; // 20% rule
        const newPocket = savingsPocket + autoSaveAmount;

        setSavingsPocket(newPocket);
        localStorage.setItem('fintrack_pocket', JSON.stringify(newPocket));

        addNotification(`Income received: PKR ${transaction.amount}`, 'success');
        addNotification(`Auto-saved PKR ${autoSaveAmount} to Savings Pocket!`, 'success');
      } else {
        addNotification(`Transaction added: PKR ${transaction.amount}`, 'success');
      }

    } catch (err) {
      console.error(err);
      addNotification("Failed to save transaction.", "danger");
    }
  };

  const addGoal = async (goal) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const newGoal = { ...goal, id: generateId(), saved: 0 };
      const updatedGoals = [...goals, newGoal];

      setGoals(updatedGoals);
      localStorage.setItem('fintrack_goals', JSON.stringify(updatedGoals));

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
