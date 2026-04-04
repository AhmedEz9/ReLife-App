const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path'); 
require('dotenv').config(); 

const app = express();
const prisma = new PrismaClient(); 
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ROUTES
// 1. Authentication Routes (Login/Register)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 2. File Upload Routes
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);


// TEST ROUTES (For debugging)
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

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});