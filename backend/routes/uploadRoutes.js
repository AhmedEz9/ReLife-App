const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middleware/auth'); 

const router = express.Router();
const prisma = new PrismaClient(); 

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'relife-app-uploads', 
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'] 
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

        // 2. Get the permanent Cloudinary URL! 
        // (Cloudinary automatically stores the URL inside req.file.path)
        const fileUrl = req.file.path;

        // 3. Save everything to the database
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

// The owner can edit their post
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, description, category, status } = req.body; 

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.userId !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized: You can only edit your own items." });
        }

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

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.userId !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own items." });
        }

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