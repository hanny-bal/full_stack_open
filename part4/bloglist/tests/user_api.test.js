const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('when there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('geheim', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    }, 10000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'hannybal',
            name: 'David',
            password: 'javascript'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with duplicate username', async () => {
        const newUser = {
            username: 'root',
            name: 'Lee',
            password: 'superbird'
        } 

        response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toBeDefined()
    })

    test('creation fails when the password length is < 3', async () => {
        const newUser = {
            username: 'hannybal',
            name: 'David',
            password: 'ja'
        }

        response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toBeDefined()
    })

    test('creation fails when the username length is < 3', async () => {
        const newUser = {
            username: 'ha',
            name: 'David',
            password: 'javascript'
        }
        
        response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toBeDefined()
    })

    test('creation fails when password is missing', async () => {
        const newUser = {
            username: 'hannybal',
            name: 'David'
        }

        response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toBeDefined()
    })

    test('creation fails when username is missing', async () => {
        const newUser = {
            name: 'David',
            password: 'javascript'
        }

        response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toBeDefined()
    })
})

// close database connection in the end
afterAll(() => {
    mongoose.connection.close()
  })