const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


// get all blogs
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


// create a new blog
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  // if title and url are missing, respond with status code 400
  if(!request.body.title && !request.body.url) {
    return response.status(400).end()
  }

  // otherwise create the blog
  const newBlog = { ...request.body, user: request.user._id }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()

  // and modify the user 
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})


// delete a blog by id
blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // check if user owns this blog entry
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'user has no privileges to delete this blog' })
  }
  
})


// update a blog by id
blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter