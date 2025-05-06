const User = require('../models/User');

// Fetch user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Assuming JWT contains user ID, extract it
    const userId = req.user.id;

    // Find user by ID and exclude password field
    const user = await User.findById(userId).select('-password');
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { name, age, height, weight, bloodGroup } = req.body;
  const userId = req.user.id; // User ID from the JWT token

  try {
    // Validate if the provided data is correct
    if (!name || !age || !height || !weight || !bloodGroup) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user and update their details
    const user = await User.findByIdAndUpdate(
      userId,
      { name, age, height, weight, bloodGroup },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  const userId = req.user.id; // User ID from the JWT token

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting user account:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};