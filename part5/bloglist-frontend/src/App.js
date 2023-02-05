import './index.css'

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

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

  // blog form
  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef} cancelLabel='cancel' buttonBeforeContent={false}>
      <BlogForm setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} 
          blogs={blogs} setBlogs={setBlogs} blogFormRef={blogFormRef}/>
    </Togglable>
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

        {blogForm()}

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
