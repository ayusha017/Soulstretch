const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
require('dotenv').config();

// routes/authRoutes.js
const jwt = require('jsonwebtoken');

// Admin login route
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials
  const adminUsername = 'admin';
  const adminPassword = 'password';

  // Check if the credentials match
  if (username === adminUsername && password === adminPassword) {
    // Create JWT token
    const token = jwt.sign(
      { username: adminUsername, role: 'admin' }, // Payload
      process.env.JWT_SECRET,  // Secret key from .env file
      { expiresIn: '1h' }     // Expiration time for the token
    );

    // Send the token in the response
    return res.status(200).json({ token, message: 'Admin logged in successfully' });
  } else {
    // If credentials do not match
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
