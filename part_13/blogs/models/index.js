const Blog = require('./blog');
const User = require('./user');
const Team = require('./team');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);
User.belongsToMany(Team, { through: 'user_teams' });
Team.belongsToMany(User, { through: 'user_teams' });

module.exports = {
  Blog,
  User,
  Team,
  Session,
}; 