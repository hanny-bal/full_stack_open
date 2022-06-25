const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

// grab password and put it into the urk
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.m9s1f.mongodb.net/?retryWrites=true&w=majority`

// connect to db
mongoose.connect(url)
console.log("connected")

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// do we want to get all persons or save a new person?
if(process.argv[3] && process.argv[4]) {
    const name = process.argv[3]
    const number = process.argv[4]

    // connect to db and save a new person
    const person = new Person({
        id: 1,
        name: name,
        number: number,
    })

    return person.save()
    .then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

// get all notes
} else if(!process.argv[3] && !process.argv[4]) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}