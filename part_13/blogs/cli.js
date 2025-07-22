const { Sequelize, DataTypes } = require('sequelize');

// Update these values if your local Postgres setup uses different credentials
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

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await Blog.findAll();
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

main(); 