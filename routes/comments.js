const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Create comment
router.post('/create', (req, res) => {
    const { event_id, user_id, content } = req.body;

    if (!event_id || !user_id || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = 'INSERT INTO comments (event_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [event_id, user_id, content], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Comment posted successfully', comment_id: result.insertId });
    });
});

// List comments for an event
router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const sql = 'SELECT * FROM comments WHERE event_id = ?';
    db.query(sql, [eventId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

module.exports = router;
