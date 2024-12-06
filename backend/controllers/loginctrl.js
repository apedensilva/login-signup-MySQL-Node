const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usermodels = require('../models/accountmodels');  // Assuming your models are properly set up

const login = async (req, res) => {
    const { fldUsername, fldPassword } = req.body;  // Use fldUsername and fldPassword to match frontend

    try {
        // Find user by username from the database
        const results = await new Promise((resolve, reject) => {
            Usermodels.findByUsername(fldUsername, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({
                message: 'Invalid Username or Password'
            });
        }

        const user = results[0]; // Since usernames are unique, we expect one result only

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(fldPassword, user.fldPassword);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Username or Password'
            });
        }

        // If the password matches, generate a JWT token
        const token = jwt.sign(
            { fldAccountID: user.fldAccountID, fldUsername: user.fldUsername },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token to the client
        res.json({
            message: 'Login successful',
            token
        });
    } catch (err) {
        console.error('Error during login: ', err);
        return res.status(500).json({
            message: 'An error occurred during login'
        });
    }
};

module.exports = { login };
