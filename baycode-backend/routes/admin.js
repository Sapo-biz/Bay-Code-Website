const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Middleware to check if user is admin (you can customize this logic)
const isAdmin = async (req, res, next) => {
  try {
    // For now, let's allow access to admin routes
    // In production, you'd want to check user roles/permissions
    next();
  } catch (error) {
    res.status(403).json({ error: 'Access denied' });
  }
};

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user statistics
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByGuild = await User.aggregate([
      {
        $group: {
          _id: '$guild',
          count: { $sum: 1 },
          totalRespectPoints: { $sum: '$respectPoints' }
        }
      }
    ]);
    
    const recentUsers = await User.find({}, '-password')
      .sort({ joinDate: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        usersByGuild,
        recentUsers
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get specific user by ID
router.get('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user (admin only)
router.put('/users/:id', isAdmin, async (req, res) => {
  try {
    const { guild, respectPoints } = req.body;
    const updateData = {};
    
    if (guild) updateData.guild = guild;
    if (respectPoints !== undefined) updateData.respectPoints = respectPoints;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Search users
router.get('/search', isAdmin, async (req, res) => {
  try {
    const { query, guild, sortBy = 'joinDate', order = 'desc' } = req.query;
    
    let searchQuery = {};
    
    if (query) {
      searchQuery.$or = [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (guild) {
      searchQuery.guild = guild;
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const users = await User.find(searchQuery, '-password')
      .sort({ [sortBy]: sortOrder })
      .limit(50);
    
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search users' });
  }
});

module.exports = router; 