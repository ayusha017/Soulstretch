const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUserAccount ,getAllUsers} = require('../controllers/userController');

// Fetch user profile (protected route)
router.get('/profile', authenticate, getUserProfile);

// Update user profile (protected route)
router.put('/profile', authenticate, updateUserProfile);

// Delete user account (protected route)
router.delete('/profile', authenticate, deleteUserAccount);

router.get('/all', authenticate, getAllUsers);
module.exports = router;
