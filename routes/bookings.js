const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Create booking
router.post('/create', (req, res) => {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if booking exists
    db.query('SELECT * FROM bookings WHERE user_id = ? AND event_id = ?', [user_id, event_id], (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'Already booked' });

        const sql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
        db.query(sql, [user_id, event_id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Booking successful', booking_id: result.insertId });
        });
    });
});

// List bookings for a user
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT bookings.*, events.* FROM bookings JOIN events ON bookings.event_id = events.id WHERE bookings.user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

module.exports = router;
