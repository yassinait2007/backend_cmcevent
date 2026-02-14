const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const upload = require('../middleware/upload.js');

// Create event
router.post('/create', upload.single('cover_image'), (req, res) => {
    const { title, description, event_date, category, venue_type, venue_name, capacity, price, organizer_id } = req.body;

    if (!title || !event_date || !organizer_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const cover_image = req.file ? req.file.path : null;

    const sql = 'INSERT INTO events (title, description, event_date, category, venue_type, venue_name, cover_image, capacity, price, organizer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [title, description, event_date, category, venue_type, venue_name, cover_image, capacity, price, organizer_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Event created successfully', event_id: result.insertId });
    });
});

// List all events
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

// List events by organizer
router.get('/organizer/:id', (req, res) => {
    const organizerId = req.params.id;
    const sql = 'SELECT * FROM events WHERE organizer_id = ?';
    db.query(sql, [organizerId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ records: results });
    });
});

// Get event details
router.get('/:id', (req, res) => {
    const eventId = req.params.id;
    const sql = 'SELECT * FROM events WHERE id = ?';
    db.query(sql, [eventId], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(results[0]);
    });
});

module.exports = router;
