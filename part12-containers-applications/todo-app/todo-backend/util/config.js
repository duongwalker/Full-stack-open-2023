require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL || undefined
// const MONGO_URL = "mongodb://duongtrick1:0989542210@localhost:3456/todos"
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL//: '//localhost:6378'
}