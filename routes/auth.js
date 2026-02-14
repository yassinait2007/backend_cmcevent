const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', (req, res) => {
    const { full_name, email, password, role, filiere } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all details' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json(err);

            const sql = 'INSERT INTO users (full_name, email, password, role, filiere) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [full_name, email, hash, role || 'Student', filiere], (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
            });
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];

        // PHP bcrypt uses $2y, while bcryptjs expects $2a or $2b. Replace for compatibility.
        const storedHash = user.password.replace(/^\$2y/, '$2a');

        bcrypt.compare(password, storedHash, (err, isMatch) => {
            if (err) return res.status(500).json(err);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    filiere: user.filiere
                }
            });
        });
    });
});

module.exports = router;
