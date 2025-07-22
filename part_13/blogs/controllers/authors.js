const express = require('express');
const { Blog } = require('../models');
const { fn, col } = require('sequelize');

const router = express.Router();

// GET /api/authors
router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'articles'],
      [fn('SUM', col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [[fn('SUM', col('likes')), 'DESC']],
  });
  res.json(authors);
});

module.exports = router; 