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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required:true,
        validate: {
            validator: function(v) {
              return /^\d{2,3}-\d+/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)