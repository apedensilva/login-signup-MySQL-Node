const jwt = require('jsonwebtoken'); // Import JWT

// JWT verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).send({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token.' });
        }

        req.user = decoded; // Attach decoded data (e.g., fldUsername) to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { verifyToken };
