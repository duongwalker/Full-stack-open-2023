const express = require('express');
const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const { sessionValidator } = require('./users');

const router = express.Router();

// GET /api/blogs
router.get('/', async (req, res) => {
  const where = {};
  const { search } = req.query;
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { author: { [Op.iLike]: `%${search}%` } },
    ];
  }
  const blogs = await Blog.findAll({
    where,
    include: {
      model: User,
      attributes: ['id', 'username', 'name'],
    },
    order: [['likes', 'DESC']],
  });
  res.json(blogs);
});

// POST /api/blogs (requires login)
router.post('/', sessionValidator, async (req, res) => {
  const { userId, ...blogData } = req.body;
  // Use req.user from sessionValidator
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const blog = await Blog.create({ ...blogData, userId: user.id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/blogs/:id (requires login)
router.delete('/:id', sessionValidator, async (req, res) => {
  const id = req.params.id;
  const deleted = await Blog.destroy({ where: { id } });
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// PUT /api/blogs/:id (update likes)
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { likes } = req.body;
  const blog = await Blog.findByPk(id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  blog.likes = likes;
  await blog.save();
  res.json(blog);
});

module.exports = router; 