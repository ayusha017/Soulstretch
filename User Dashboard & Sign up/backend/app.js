const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

// --- MIDDLEWARES ---
app.use(helmet()); // Adds security headers to requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Allows handling of JSON data in requests

// --- ROUTES ---
app.use('/api/auth', authRoutes); // Authentication routes (signup, login)
app.use('/api/user', userRoutes); // User-related routes (profile, update, etc.)

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
