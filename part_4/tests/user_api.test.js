const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

    userObject = new User(helper.initialUsers[1])
    await userObject.save()
})

test('user has invalid username is not added', async() => {
    const userToAdd ={
        username: 'Du',
        name: 'Phuc Du',
        password: '67890'
    }

    await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(userToAdd.username)
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

test('user has invalid password is not added', async() => {
    const userToAdd ={
        username: 'Minh',
        name: 'Quang Minh',
        password: 'ab'
    }

    await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(userToAdd.username)
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})


test('user has a taken username is not added', async() => {
    const userToAdd ={
        username: 'Duong',
        name: 'Hoang Duong',
        password: '123456789'
    }

    await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(userToAdd.username)
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})


afterAll(async () => {
    await mongoose.connection.close()
})