import './index.css'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // load all blog posts
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // load user from the local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // handle a login of the user
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      // set local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      // set states
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // log the user out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // create a new blog
  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    if(title.length <= 0) {
      setErrorMessage('New blog is missing a title')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if(author.length <= 0) {
      setErrorMessage('New blog is missing an author')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if(url.length <= 0) {
      setErrorMessage('New blog is missing an url')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      try {
        const newBlog = await blogService.create({
          title: title,
          author: author,
          url: url
        })

        setBlogs([...blogs, newBlog])
        setSuccessMessage(`a new blog ${title} by ${author} was added`)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

      } catch(exception) {
        setErrorMessage(`could not add new blog ${title} by ${author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  // login form element
  const loginForm = () => (
    (
      <div>
        <h2>Login to application</h2>

        <Notification type='error' message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  )

  // blog view
  const blogView = () => (
    (
      <div>
        <h2>blogs</h2>

        <Notification type='error' message={errorMessage} />
        <Notification type='success' message={successMessage} />

        <p>
          {user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
        </p>

        <h3>create new</h3>
        <form onSubmit={handleCreateNewBlog}>
          <div>
            title:
            <input 
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input 
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input 
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  )

  // JSX rendering depending on the user login state
  return (
    <>
      {user === null ? 
        loginForm() : 
        blogView()
      }
    </>
  )
}

export default App
