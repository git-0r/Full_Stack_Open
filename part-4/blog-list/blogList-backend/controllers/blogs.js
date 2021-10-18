const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const title = request.body.title
    const author = request.body.author
    const url = request.body.url
    const likes = request.body.likes === undefined ? 0 : request.body.likes

    if (title === undefined) {
        response.status(400).json('title missing')
    } else if (url === undefined) {
        response.status(400).json('url missing')
    } else {
        const blog = new Blog({ title, author, url, likes })

        const newBlog = await blog.save()
        response.status(201).json(newBlog)
    }
})

blogsRouter.put('/:id', async (request, response) => {

    const id = request.params.id
    const likes = request.body.likes

    const blog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
    response.json(blog)
})


blogsRouter.delete('/:id', async (request, response) => {

    const id = request.params.id

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})


module.exports = blogsRouter