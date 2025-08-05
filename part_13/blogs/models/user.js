const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../util/db');
const Blog = require('./blog');

class User extends Model {
  async numberOfBlogs() {
    return (await this.getBlogs()).length;
  }
  static async withBlogs(limit) {
    return await User.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('blogs.id')), 'blog_count']]
      },
      include: [
        {
          model: Blog,
          attributes: [],
        },
      ],
      group: ['user.id'],
      having: sequelize.literal(`COUNT(blogs.id) > ${limit}`),
    });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  defaultScope: {
    where: { disabled: false },
  },
  scopes: {
    admin: { where: { admin: true } },
    disabled: { where: { disabled: true } },
    name(value) {
      return { where: { name: { [Op.iLike]: value } } };
    },
  },
});

module.exports = User; 