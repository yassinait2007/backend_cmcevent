const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads', 'uploads/profiles', 'uploads/events'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'profile_image') {
            cb(null, 'uploads/profiles');
        } else if (file.fieldname === 'cover_image') {
            cb(null, 'uploads/events');
        } else {
            cb(null, 'uploads/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
