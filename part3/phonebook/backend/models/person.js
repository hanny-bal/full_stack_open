const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`Connecting to ${url}`)

// connect to the mongo db database
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log(`error connecting to MongoDB: ${error.message}`)
    })

// create an appropriate schema
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)