const express = require('express');
const { User, Blog, Session } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.SECRET || 'secret';

// Middleware to check session token and user status
const sessionValidator = async (req, res, next) => {
  const auth = req.get('authorization');
  if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' });
  }
  const token = auth.substring(7);
  try {
    const decoded = jwt.verify(token, SECRET);
    const session = await Session.findOne({ where: { token } });
    if (!session) {
      return res.status(401).json({ error: 'session expired' });
    }
    const user = await User.scope(null).findByPk(decoded.id); // ignore defaultScope
    if (!user || user.disabled) {
      return res.status(403).json({ error: 'user disabled' });
    }
    req.user = user;
    req.session = session;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
};

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.scope(null).findOne({ where: { username } });
  if (!user || user.disabled || password !== 'secret') {
    return res.status(401).json({ error: 'invalid credentials or user disabled' });
  }
  const userForToken = { username: user.username, id: user.id };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: '1h' });
  await Session.create({ user_id: user.id, token });
  res.json({ token, username: user.username, name: user.name });
});

// DELETE /api/logout
router.delete('/logout', sessionValidator, async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/users/:id/teams
router.get('/:id/teams', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const teams = await user.getTeams({ attributes: ['id', 'name'] });
  res.json(teams);
});

// GET /api/users/with-blogs/:limit
router.get('/with-blogs/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit, 10) || 0;
  const users = await User.withBlogs(limit);
  res.json(users);
});

module.exports = {
  router,
  sessionValidator,
}; 