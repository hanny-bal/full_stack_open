const express = require('express')
const morgan = require('morgan')
const app = express()

// custom token to print request body
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
// app.use(morgan('tiny'))  // predefined style
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))  // custom style with json body

const PORT = 3001

// hardcoded list of persons
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

// get a list of persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

// get information about the person list
app.get('/info', (request, response) => {
    message = `<p>Phonebook has info for ${persons.length} people.</p>`
    message += `<p>${new Date(Date.now())}</p>`
    response.send(message)
})

// get information about a particular person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// delete a person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

// add a person to the database
app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(person => person.name)

    // generate a random id
    const min = Math.ceil(1)
    const max = Math.floor(10000)
    const id = Math.floor(Math.random() * (max - min + 1) + min)

    // name or number is missing
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number is missing' 
        })
    }
    // name already exists
    else if(names.includes(body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    // everything works 
    else {
        const person = {
            id: id,
            name: body.name,
            number: body.number
        }
        persons = persons.concat(person)
        response.json(person)
    }
})

// start the server
app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
  })