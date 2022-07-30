const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// create a new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // check if username and password is present
    if(!username || !password) {
        return response.status(400).json({
            error: 'username and password must be given'
        })
    }

    // check if username and password are at least three characters long
    if(username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: 'username and password must be at least three characters long'
        })
    }

    // check if username is unique
    const existingUser = await User.findOne({ username })
    if(existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})


// get all users from the database
usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})

module.exports = usersRouter