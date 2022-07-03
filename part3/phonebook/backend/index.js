require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

// custom token to print request body
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
// app.use(morgan('tiny'))  // predefined style
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))  // custom style with json body

const PORT = process.env.PORT || 3001

// get a list of persons
app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(result => {
      response.json(result)
    })
    .catch(error => next(error))
  })

// get information about the person list
app.get('/info', (request, response, next) => {
    Person.count({})
        .then(count => {
            message = `<p>Phonebook has info for ${count} people.</p>`
            message += `<p>${new Date(Date.now())}</p>`
            response.send(message)
        })
        .catch(error => next(error))
})

// get information about a particular person
app.get('/api/persons/:id', (request, response, next) => {    
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
            
        })
        .catch(error => next(error))
})

// delete a person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// update a person
app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// add a person to the database
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // const names = persons.map(person => person.name) 

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
    /* else if(Person.find({"name": body.name})) {
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    } */

    // everything works 
    const person = new Person({
        id: id,
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
    response.json(savedPerson)
    })
    .catch(error => next(error))
})


// define the error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
  // this has to be the last loaded middleware.
app.use(errorHandler)

// start the server
app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
  })