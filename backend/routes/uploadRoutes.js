const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// 1. Configure where and how Multer saves the files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Adds a timestamp so files with the same name don't overwrite each other!
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// 2. Initialize the post office
const upload = multer({ storage: storage });

// 3. The Upload POST Route
// 'image' is the exact name the frontend will use when attaching the file
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // Create a URL so the frontend can look at the picture later
        const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        res.status(201).json({ 
            message: "File uploaded successfully!", 
            url: fileUrl 
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Server error during file upload." });
    }
});

module.exports = router;