const express = require('express');
const router = express.Router();
const store = require('../data/store');

// Simple in-memory session (for demo purposes) or just return user details
// In a real app, use JWT.

// POST /api/auth/signup
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const data = store.getData();

    // Check if user exists
    if (data.users && data.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app: Hash this!
        joinedAt: new Date().toISOString()
    };

    if (!data.users) data.users = [];
    data.users.push(newUser);
    store.saveData(data);

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const data = store.getData();

    const user = data.users ? data.users.find(u => u.email === email && u.password === password) : null;

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
