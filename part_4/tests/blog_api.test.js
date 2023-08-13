const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


test('blogs are return as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const keys = response.body.map((blog) => {
        return 'id' in blog
    })
    expect(keys.includes(false)).toBe(false)
})

test('creates a new blog post', async () => {
    const blogToBeCreated = {
        _id: '5a422a08943534d17f7',
        title: 'Twenty Thousand Leagues Under the Seas',
        author: 'Jules Verne',
        url: 'https://reactpatterns.com/',
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(blogToBeCreated)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.includes(blogToBeCreated))
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)


test('blog without like will default to the value 0', async () => {
    const newBlog = {
        _id: '5a422a08943dssdflj534d17f7',
        title: 'Sans Famille',
        author: 'Hector Malot',
        url: 'https://reactpatterns.com/',
    }

    const response = await api
        .post('/api/blogs',)
        .send(newBlog)
        .expect(201)

    expect(response.body.likes).toBe(0)
})

test('blog without title or url properties', async () => {
    const newBlog = {
        _id: '5a422a08943dssdflj534d17f7',
        author: 'Hector Malot',
        url: 'https://reactpatterns.com/'
    }

    const newBlog2 = {
        _id: '5a422a08943dssdflj534d17f7',
        title: 'Sans Famille',
        author: 'Hector Malot'
    }

    await api
        .post('/api/blogs',)
        .send(newBlog)
        .expect(400)

    await api
        .post('/api/blogs',)
        .send(newBlog2)
        .expect(400)
},10000)



test('delete a blog', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
},10000)


test('update a blog', async() => {
    const existingBlogs = await helper.blogsInDb()
    const blogToBeUpdated = existingBlogs[1]
    console.log(blogToBeUpdated.id)
    const updatedData = {
        likes: 278
    }

    const response = await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(updatedData)
        .expect(200)
    
    expect(response.body.likes).toBe(updatedData.likes)

})


afterAll(async () => {
    await mongoose.connection.close()
})