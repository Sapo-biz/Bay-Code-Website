const express = require('express');
const Problem = require('../models/Problem');
const router = express.Router();

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
