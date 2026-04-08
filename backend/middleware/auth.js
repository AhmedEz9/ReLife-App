const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // 1. Get the token from the header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // 2. Verify the token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token." });
    }
}

module.exports = verifyToken;