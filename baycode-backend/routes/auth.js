const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName, school, bayArea } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign random guild
    const guilds = ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Magenta'];
    const randomGuild = guilds[Math.floor(Math.random() * guilds.length)] + ' Guild';

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      school,
      bayArea,
      guild: randomGuild
    });

    await user.save();
    
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '24h' 
    });
    
    res.status(201).json({ 
      message: 'User created!', 
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        school: user.school,
        bayArea: user.bayArea,
        guild: user.guild,
        respectPoints: user.respectPoints,
        joinDate: user.joinDate
      },
      token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '24h' 
    });

    res.json({ 
      token, 
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        school: user.school,
        bayArea: user.bayArea,
        guild: user.guild,
        respectPoints: user.respectPoints,
        joinDate: user.joinDate
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
