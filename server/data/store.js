const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'db.json');

// Initial seed data
const initialData = {
    transactions: [
        { id: 1, title: 'Grocery Shopping', amount: 1200, category: 'Food', date: '2023-10-24', type: 'expense' },
        { id: 2, title: 'Uber Ride', amount: 350, category: 'Transport', date: '2023-10-25', type: 'expense' },
        { id: 3, title: 'Freelance Payment', amount: 15000, category: 'Income', date: '2023-10-26', type: 'income' },
    ],
    budget: 20000,
    goals: [
        { id: 1, name: 'New Laptop', target: 80000, current: 15000, color: '#6366F1' },
        { id: 2, name: 'Emergency Fund', target: 50000, current: 20000, color: '#10B981' },
    ],
    savingsPocket: 2450,
    users: []
};

// Ensure directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return initialData;
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
    getData: () => loadData(),
    saveData: (data) => saveData(data)
};
