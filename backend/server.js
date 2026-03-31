const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); 

const app = express();
const prisma = new PrismaClient(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// A simple test route
app.get('/', (req, res) => {
    res.send('Hello from ReLife Backend! 🚀');
});

// A route to test our database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ message: "Database connection successful!", users: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection failed." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});