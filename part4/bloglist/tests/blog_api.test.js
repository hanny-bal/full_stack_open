const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// run before testing
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 10000)

// test basic get functionality
describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property is named id', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

// test basic post functionality
describe('when posting a new blog', () => {
    test('a new blog entry is created', async() => {
        const newBlog = {
            "title": "commUNIty",
            "author": "University of Salzburg",
            "url": "https://blog.plus.ac.at/",
            "likes": 3244
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain(
            'commUNIty'
        )
    })

    test('the likes property will default to 0 if missing', async() => {
        const newBlog = {
            "title": "commUNIty",
            "author": "University of Salzburg",
            "url": "https://blog.plus.ac.at/"
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.likes).toBe(0)
    })

    test('the server returns status code 400 if title and url are missing', async() => {
        const newBlog = {
            "author": "Jakob",
            "likes": 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

// test delete functionality
describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async() => {
        const blogsToStart = await helper.blogsInDb()
        const blogToDelete = blogsToStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsToStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

// test update functionality
describe('updating a blog by id', () => {
    test('succeeds and returns the altered version', async() => {
        const blogsToStart = await helper.blogsInDb()
        const blogToUpdate = blogsToStart[0]
        const updatedBlog = {
            title: "Updated Blog",
            author: "David",
            url: "newurl.com",
            likes: blogToUpdate.likes + 500
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        expect(response.body.title).toBe(updatedBlog.title)
        expect(response.body.author).toBe(updatedBlog.author)
        expect(response.body.url).toBe(updatedBlog.url)
        expect(response.body.likes).toBe(updatedBlog.likes)
    })
})

// close database connection in the end
afterAll(() => {
    mongoose.connection.close()
  })