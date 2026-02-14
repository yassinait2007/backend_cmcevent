const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Add to Favorites
router.post('/add', (req, res) => {
    const { user_id, event_id } = req.body;
    if (!user_id || !event_id) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const sql = 'INSERT INTO favorites (user_id, event_id) VALUES (?, ?)';
    db.query(sql, [user_id, event_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Added to favorites', favorite_id: result.insertId });
    });
});

// Remove from Favorites
router.post('/remove', (req, res) => {
    const { user_id, event_id } = req.body;
    const sql = 'DELETE FROM favorites WHERE user_id = ? AND event_id = ?';
    db.query(sql, [user_id, event_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Removed from favorites' });
    });
});

// List Favorites
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT events.* FROM favorites JOIN events ON favorites.event_id = events.id WHERE favorites.user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

module.exports = router;
