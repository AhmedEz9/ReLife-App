const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middleware/auth'); 

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

// Upload Route
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // 1. Get the text data sent along with the image
        const title = req.body.title || "Untitled Item";
        const description = req.body.description || "";
        const category = req.body.category || "Other"; 
        const userId = parseInt(req.body.userId) || 1; 

        // 2. Create the file URL
        const fileUrl = `https://relife-backend.onrender.com/uploads/${req.file.filename}`;

        // 3. Save everything to the database! (Status defaults to "Available" automatically)
        const newPost = await prisma.post.create({
            data: {
                title: title,
                description: description,
                category: category, 
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

// Get strictly the logged-in user's posts
router.get('/my-posts', verifyToken, async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { userId: req.user.userId }, 
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        console.error("Fetch user posts error:", error);
        res.status(500).json({ error: "Server error while fetching your posts." });
    }
});

// The owner can edit their post's title, description, category, AND STATUS
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, description, category, status } = req.body; 

        // 1. Check if the post exists
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        // 2. Does the logged-in user own this post?
        if (post.userId !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized: You can only edit your own items." });
        }

        // 3. Update the post in the database
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { 
                title: title || post.title, 
                description: description !== undefined ? description : post.description,
                category: category || post.category,
                status: status || post.status 
            }
        });

        res.json({ message: "Post updated successfully!", post: updatedPost });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Server error while updating post." });
    }
});

// Only the owner can delete their post
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        // 1. Check if the post exists
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        // 2. Does the logged-in user own this post?
        if (post.userId !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own items." });
        }

        // 3. Delete the post from the database
        await prisma.post.delete({
            where: { id: postId }
        });

        res.json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server error while deleting post." });
    }
});

module.exports = router;