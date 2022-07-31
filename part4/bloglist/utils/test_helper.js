const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Stronglifts",
        "author": "Mehdi",
        "url": "stronglifts.com",
        "likes": 21321
    },
    {
        "title": "The Student's Life",
        "author": "David",
        "url": "thestudentslife.com",
        "likes": 102
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}