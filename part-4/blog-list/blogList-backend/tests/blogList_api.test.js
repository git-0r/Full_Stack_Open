const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "async/await",
        author: "me",
        url: "https://async-await.com/",
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('async/await')
})

test('missing title and url returns 400 Bad Request', async () => {
    const newBlog = {
        author: "me",
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    // const response = await api.get('/api/blogs')
    // const contents = response.body.map(r => r.title)

    // expect(response.body).toHaveLength(initialBlogs.length + 1)
    // expect(contents).toContain('async/await')
})

test('unique identifier property is named id', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()

})

test('missing likes property defualts to 0', async () => {

    const newBlog = {
        title: "async/await",
        author: "me",
        url: "https://async-await.com/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.filter(r => r.title === "async/await")
    expect(titles[0].likes).toBe(0)
})

test('updating likes works', async () => {

    const blogsAtStart = await (await api.get('/api/blogs')).body
    const likesAtStart = blogsAtStart[0].likes

    const updatedObject = await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send({ likes: `${likesAtStart + 1}` })

    expect(updatedObject.body.likes.toString()).toBe(`${likesAtStart + 1}`)
})

test('deletion succeeds with status code 204', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1
    )

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})