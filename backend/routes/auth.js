const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const memoryDB = require('../db/memory');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Helper to use MongoDB or fallback to memory DB
const useDB = (mongoModel) => {
  return {
    findOne: async (query) => {
      try {
        return await mongoModel.findOne(query);
      } catch (e) {
        if (query.email) return memoryDB.findUserByEmail(query.email);
        return null;
      }
    },
    findById: async (id) => {
      try {
        return await mongoModel.findById(id);
      } catch (e) {
        return memoryDB.findUserById(id);
      }
    },
    create: async (data) => {
      try {
        return await mongoModel.create(data);
      } catch (e) {
        return memoryDB.createUser(data);
      }
    },
    findByIdAndUpdate: async (id, updates, opts) => {
      try {
        return await mongoModel.findByIdAndUpdate(id, updates, opts);
      } catch (e) {
        return memoryDB.updateUser(id, updates);
      }
    }
  };
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });

    const db = useDB(User);
    const existing = await db.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.create({ name, email, passwordHash });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const db = useDB(User);
    const user = await db.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    // Update last login
    const updatedUser = await db.findByIdAndUpdate(
      user._id,
      { lastLogin: new Date() },
      { new: true }
    );

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        role: updatedUser.role,
        lastLogin: updatedUser.lastLogin,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const db = useDB(User);
    const user = await db.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { passwordHash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, bio } = req.body;
    const db = useDB(User);
    const user = await db.findByIdAndUpdate(
      req.userId,
      { name, email, phone, bio },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { passwordHash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
