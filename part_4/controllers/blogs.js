const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if (!('likes' in body)) {
        body['likes']=0
    }

    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })


    const savedBlog = await blog.save()
    if((blog.url !== undefined && blog.url !== null) && (blog.title !== undefined && blog.title !== null)) {
        console.log(blog.url)
        console.log(blog.title)
        response.status(201).json(savedBlog)
    }
    else {
        response.status(400).json({ error: 'Title and/or URL missing' })
    }
})


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    if(updatedBlog) {
        response.status(200).json(updatedBlog)
    }
    else {
        response.status(404).json({ error: 'Blog not found' })
    }
})


module.exports = blogsRouter


