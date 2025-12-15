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

// In-memory fallback for Vercel (Read-only FS)
let memoryData = null;

function loadData() {
    if (memoryData) return memoryData;

    try {
        if (fs.existsSync(DATA_FILE)) {
            memoryData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
            return memoryData;
        }
    } catch (err) {
        console.warn("Could not read file, using initial data:", err.message);
    }

    memoryData = { ...initialData };
    return memoryData;
}

function saveData(data) {
    memoryData = data;

    try {
        // Try to write to disk, but don't crash if it fails (Vercel)
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.warn("Could not save to disk (likely Vercel environment). Data saved to memory only.");
    }
}

module.exports = {
    getData: () => loadData(),
    saveData: (data) => saveData(data)
};
