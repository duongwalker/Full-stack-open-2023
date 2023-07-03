const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)

})

app.get('/info', (req, res) => {
    // Create a new Date object
    let currentDate = new Date();

    // Define options for the date and time format
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
    };

    let currentDateTime = currentDate.toLocaleString('en-US', options).replace(/\,/g, '');
    console.log(typeof currentDateTime)

    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDateTime} (Eastern European Standard Time)</p>
        `

    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const min = persons.length
    const max = 999999
    const id = Math.floor(Math.random() * (max - min + 1)) + min
    return id
}

app.post('/api/persons', (request, response) => {

    const body = request.body
    const existedName=persons.find(person => person.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }
    
    else if(existedName) {
     return response.status(400).json({
         error: 'name must be unique'
     })
    }


    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})