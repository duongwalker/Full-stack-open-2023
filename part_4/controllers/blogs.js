const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const User = require('../models/user')

const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    if (!('likes' in body)) {
        body['likes'] = 0
    }
    
    try {
        const user = request.user

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        if ((blog.url !== undefined && blog.url !== null) && (blog.title !== undefined && blog.title !== null)) {
            response.status(201).json(savedBlog)
        }
        else {

            response.status(400).json({ error: 'Title and/or URL missing' })
        }

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

    }
    catch (error) {
        console.log(error.message)
        return response.status(400).json({ error: error.message })
    }
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
   
    try {
        const user = request.user
        const userId = user.id
        const blogId = request.params.id
        const blog = await Blog.findById(blogId)

        if (blog.user.toString() === userId) {
            await Blog.findByIdAndDelete(blogId)
            return response.status(204).end()
        }
        else {
            return response.status(403).json({ error: 'Unauthorized' })
        }

    }
    catch (error) {
        console.error(error)
        return response.status(500).json({ error: error.message })
    }
})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (updatedBlog) {
        response.status(200).json(updatedBlog)
    }
    else {
        response.status(404).json({ error: 'Blog not found' })
    }
})

module.exports = blogsRouter


