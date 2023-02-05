import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)
  const hideWhenDetailsVisible = { display: showDetails ? 'none' : 'inline' }
  const showWhenDetailsVisible = { display: showDetails ? 'inline' : 'none' }
  
  const toggleDetailVisibility = () => {
    setShowDetails(!showDetails)
}

  return(
    <div style={{border: 'solid', margin: 10, padding: 10}}>
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
            <button>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      </div>
    </div>  
  )
}

export default Blog