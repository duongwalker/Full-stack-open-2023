require('dotenv').config();

module.exports = {
  DB_NAME: process.env.DB_NAME || 'postgres',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || 'admin123',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_DIALECT: 'postgres',
  PORT: process.env.PORT || 3001,
}; 