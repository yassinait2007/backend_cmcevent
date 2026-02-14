const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const upload = require('./middleware/upload.js');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/events.js');
const commentRoutes = require('./routes/comments.js');
const bookingRoutes = require('./routes/bookings.js');
const userRoutes = require('./routes/users.js');
const favoriteRoutes = require('./routes/favorites.js');
const waitlistRoutes = require('./routes/waitlist.js');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/waitlist', waitlistRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server;
