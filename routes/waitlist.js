const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Join Waitlist
router.post('/join', (req, res) => {
    const { user_id, event_id } = req.body;
    if (!user_id || !event_id) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const sql = 'INSERT INTO waitlist (user_id, event_id) VALUES (?, ?)';
    db.query(sql, [user_id, event_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Added to waitlist', waitlist_id: result.insertId });
    });
});

// List Waitlist for Event
router.get('/event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const sql = 'SELECT waitlist.*, users.full_name, users.email FROM waitlist JOIN users ON waitlist.user_id = users.id WHERE event_id = ?';
    db.query(sql, [eventId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

// Update waitlist status
router.post('/update_status', (req, res) => {
    const { id, status } = req.body;
    if (!id || !status) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const sql = 'UPDATE waitlist SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Status updated' });
    });
});

module.exports = router;
