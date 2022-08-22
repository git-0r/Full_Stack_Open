const User = require("../models/user")
const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const api = supertest(app)

beforeEach(() => {
    User.deleteMany({})
})

test('invalid users are not created', async () => {

    const usersAtStart = await api.get('/api/users')

    const invalidUser = new User({
        username: "ab",
        name: "jest",
        password: "password"
    })

    const res = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

    expect(res.body.error).toBe("invalid username")

    const usersAtEnd = await api.get('/api/users')

    expect(usersAtStart.length).toBe(usersAtEnd.length)

})

afterAll(async () => {
    await mongoose.connection.close()
})
