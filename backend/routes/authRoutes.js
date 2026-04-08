const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middleware/auth'); 

const router = express.Router();
const prisma = new PrismaClient();

// Creates a new user
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // 1. Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email." });
        }

        // 2. Hash (scramble) the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save the new user to the database
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error during registration." });
    }
});

// Authenticates an existing user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user in the database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // 2. Check if the password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // 3. Create a JWT token (the digital ticket)
        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        res.json({ 
            message: "Login successful!", 
            token: token, 
            user: { id: user.id, username: user.username, email: user.email } 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error during login." });
    }
});

// Uses the token to return the logged-in user's profile
router.get('/me', verifyToken, async (req, res) => {
    try {
        // req.user.userId comes from the verified token!
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, username: true, email: true, createdAt: true } 
        });

        if (!user) return res.status(404).json({ error: "User not found." });
        
        res.json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Server error while fetching profile." });
    }
});

module.exports = router;