const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id;

    const blog = await Blog
        .find({ _id: id })
    response.json(blog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
    const id = request.params.id
    console.log(id, request.body)

    await Blog.findByIdAndUpdate(id, { $push: { comments: request.body.comment } })
    response.json({ comment: request.body.comment })
})

blogsRouter.post('/', userExtractor, async (request, response) => {

    const user = request.user

    const title = request.body.title
    const author = request.body.author
    const url = request.body.url
    const likes = request.body.likes === undefined ? 0 : request.body.likes


    if (title === undefined) {
        response.status(400).json('title missing')
    } else if (url === undefined) {
        response.status(400).json('url missing')
    } else {
        const blog = new Blog({ title, author, url, likes, user: user.id })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.put('/:id', async (request, response) => {

    const id = request.params.id
    const likes = request.body.likes

    const blog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
    response.json(blog)
})


blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    const user = request.user

    const blogToBeDeleted = await Blog.findById(id)

    if (user.id.toString() !== blogToBeDeleted.user.toString()) {
        response.status(401).json({ error: 'user mismatch' })
    }
    else {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    }

})


module.exports = blogsRouter