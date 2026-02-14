const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const upload = require('../middleware/upload.js');

// Get User Profile
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT id, full_name, email, role, filiere, bio, points, profile_image FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(results[0]);
    });
});

// Update Profile Image
router.post('/upload-image', upload.single('profile_image'), (req, res) => {
    const userId = req.body.user_id;

    if (!userId || !req.file) {
        return res.status(400).json({ message: 'Missing user ID or image' });
    }

    const imagePath = req.file.path;
    const sql = 'UPDATE users SET profile_image = ? WHERE id = ?';

    db.query(sql, [imagePath, userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Profile image updated', profile_image: imagePath });
    });
});

module.exports = router;
