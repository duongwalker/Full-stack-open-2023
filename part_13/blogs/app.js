const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('postgres', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

const Blog = sequelize.define('Blog', {
  author: DataTypes.STRING,
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'blogs',
  timestamps: false,
});

// GET /api/blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// POST /api/blogs
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/blogs/:id
app.delete('/api/blogs/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await Blog.destroy({ where: { id } });
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 