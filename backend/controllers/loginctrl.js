const User = require('../models/accountmodels');  // Make sure the path is correct
const bcrypt = require('bcryptjs');  // Ensure bcryptjs is installed and imported
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { fldUsername, fldPassword } = req.body;
  
    try {
      // Find the user by username
      User.findByUsername(fldUsername, async (err, user) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred while accessing the database' });
        }
  
        if (!user) {
          return res.status(401).json({ message: 'Invalid Username or Password' });
        }
  
        // Compare password with stored hashed password
        const isMatch = await bcrypt.compare(fldPassword, user.fldPassword);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid Username or Password' });
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { fldAccountID: user.fldAccountID, fldUsername: user.fldUsername },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        return res.json({ message: 'Login successful', token });
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'An error occurred during login' });
    }
  };
  
  module.exports = {
    login
  }