import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [showDetails, setShowDetails] = useState(false)
  const hideWhenDetailsVisible = { display: showDetails ? 'none' : 'inline' }
  const showWhenDetailsVisible = { display: showDetails ? 'inline' : 'none' }

  const toggleDetailVisibility = () => {
    setShowDetails(!showDetails)
  }

  // update the number of likes
  const updateLikes  = async () => {

    // make the put request
    const updatedBlog = await blogService.like(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })

    // and update the blog list
    const index = blogs.findIndex(b => b.id === blog.id)
    let updatedBlogs = [...blogs] // important to create a copy, otherwise you'll modify state outside of setState call
    updatedBlogs[index] = updatedBlog
    setBlogs(updatedBlogs)
  }

  // delete a blog entry
  const remove = async () => {
    // make the request
    await blogService.remove(blog.id)

    // and update the blog list
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  return(
    <div style={{ border: 'solid', margin: 10, padding: 10 }}>
      {blog.title}

      <div style={hideWhenDetailsVisible}>
        <button style={{ marginLeft: 5 }} onClick={toggleDetailVisibility}>view</button>
      </div>
      <div style={showWhenDetailsVisible}>
        <button style={{ marginLeft: 5 }} onClick={toggleDetailVisibility}>hide</button>
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blog.author}</div>
          <div><button onClick={remove}>remove</button></div>
        </div>
      </div>
    </div>
  )
}

export default Blog