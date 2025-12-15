const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const store = require('./data/store');
const { generateInsights } = require('./services/analysisService');

const app = express();
const PORT = 3001;

const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// --- 1. Data Endpoints ---

// Get all initial data
app.get('/api/data', (req, res) => {
    const data = store.getData();
    res.json(data);
});

// Add Transaction
app.post('/api/transactions', (req, res) => {
    const data = store.getData();
    const newTransaction = {
        ...req.body,
        id: Date.now(),
        amount: parseFloat(req.body.amount)
    };

    data.transactions.unshift(newTransaction);
    let autoSavedAmount = 0;

    // Smart Auto-Save Logic (Moved to Backend)
    if (newTransaction.type === 'expense') {
        const amount = newTransaction.amount;
        // Round up to nearest 500
        const roundedUp = Math.ceil(amount / 500) * 500;
        const savings = roundedUp - amount;

        if (savings > 0) {
            data.savingsPocket += savings;
            autoSavedAmount = savings;
        }
    }

    store.saveData(data);

    res.json({
        message: 'Transaction added',
        transaction: newTransaction,
        autoSaved: autoSavedAmount,
        savingsPocket: data.savingsPocket
    });
});

// Add Goal
app.post('/api/goals', (req, res) => {
    const data = store.getData();
    const newGoal = {
        ...req.body,
        id: Date.now(),
        current: 0
    };

    data.goals.push(newGoal);
    store.saveData(data);

    res.json({ message: 'Goal created', goal: newGoal });
});

// --- 2. Advisor Endpoints ---

// Get AI Insights
app.get('/api/advisor/insights', (req, res) => {
    const data = store.getData();
    const result = generateInsights(data.transactions, data.budget, data.savingsPocket);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
