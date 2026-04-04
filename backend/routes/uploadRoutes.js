const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient(); 

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upgraded Upload Route
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // 1. Get the text data sent along with the image
        const title = req.body.title || "Untitled Item";
        const description = req.body.description || "";
        const userId = parseInt(req.body.userId) || 1; 

        // 2. Create the file URL
        const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        // 3. Save everything to the database!
        const newPost = await prisma.post.create({
            data: {
                title: title,
                description: description,
                imageUrl: fileUrl,
                userId: userId
            }
        });

        res.status(201).json({ 
            message: "Post created successfully!", 
            post: newPost 
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Server error during post creation." });
    }
});

// Get all posts for the Feed
router.get('/', async (req, res) => {
    try {
        // Fetch all posts and include the username of the person who posted it
        const posts = await prisma.post.findMany({
            include: { user: { select: { username: true } } },
            orderBy: { createdAt: 'desc' } 
        });
        
        res.json(posts);
    } catch (error) {
        console.error("Fetch posts error:", error);
        res.status(500).json({ error: "Server error while fetching posts." });
    }
});

module.exports = router;