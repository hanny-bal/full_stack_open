import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setErrorMessage, setSuccessMessage, blogs, setBlogs, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // create a new blog
  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    // first, check if all values are valid
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
    }

    // if everything is fine, create the new blog
    else {
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
        blogFormRef.current.toggleVisibility()
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

  // main JSX content
  return(
    <>
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
    </>
  )
}

export default BlogForm