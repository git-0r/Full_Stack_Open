const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {

    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const name = request.body.name
    const number = request.body.number

    if (name === undefined || number === undefined) {

        return response.status(400).json({ error: 'name or number missing' })
    }

    Person.find({ 'name': name })
        .then(result => {
            console.log('result', result)
            if (result === false) {
                return response.status(400).json({ error: 'name must be unique' })
            }
        })

    const person = new Person({
        'name': name,
        'number': number
    })

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const number = req.body.number
    console.log(id, number)
    Person.findByIdAndUpdate(id, { 'number': number }, { new: true, runValidators: true })
        .then(person => res.json(person))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(response.status(204).end())
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})