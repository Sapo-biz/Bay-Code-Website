require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const app = express();

// ===== 1. update lines =====
app.use(express.json()); // Allows JSON data in requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for now
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// ===== 2. Connect to MongoDB (same as before) =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.log('❌ MongoDB error:', err));

// ===== 3. Add auth routes =====
app.use('/api/auth', authRoutes);

// ===== 4. Add admin routes =====
app.use('/api/admin', adminRoutes);

// ===== 5. Add a test API route =====
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// ===== 6. Keep this at the end =====
app.listen(5000, () => console.log('🌐 Backend running on http://localhost:5000'));
