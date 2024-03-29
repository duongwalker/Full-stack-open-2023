require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))



morgan.token('data', (req) => {

    return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


const customLogger = (req, res, next) => {
    const logMessage = [
        req.method,
        req.url,
        res.statusCode,
        res.getHeader('content-length') || '-',
        `${res.responseTime} ms`,
        JSON.stringify(res.body)
    ].join(' ')

    console.log(logMessage)

    next()
}
app.use(customLogger)

// let persons = [
// ]

app.get('/api/persons', (req, res) => {
    Entry.find({}).then((entries) => {
        res.json(entries)
    })
})

app.get('/info', (req, res) => {

    let currentDate = new Date()

    let options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'long',
        hour12: false,
        yearSeparator: '',
        monthSeparator: '',
        daySeparator: ''
    }

    let currentDateTime = currentDate.toLocaleString('en-US', options).replace(/,/g, '')
    console.log(Entry)

    res.send(
        `<p>Phonebook has info for ${Entry.length} people</p>
        <p>${currentDateTime} (Eastern European Standard Time)</p>
        `

    )
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)

    Entry.findById(id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})


app.delete('/api/persons/:id', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :data'), (request, response, next) => {

    const body = request.body

    Entry.findOne({ name: body.name })
        .then(existingEntry => {
            if (existingEntry) {
                existingEntry.number = body.number
                existingEntry.save().then(savedEntry => {
                    response.json(savedEntry)
                })
            }

            else {
                const entry = new Entry({
                    name: body.name,
                    number: body.number
                })
                entry.save().then(savedEntry => {
                    response.json(savedEntry)
                })
                    .catch(error => next(error))
            }

        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const { name, number } = body

    Entry.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})


app.use(unknownEndPoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})