import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = forwardRef(({ blog, addLikeBlog, deleteOneBlog }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ' ' }
  const showWhenVisible = { display: visible ? ' ' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  const likeBlog = (event) => {
    event.preventDefault()
    addLikeBlog(blog.id, {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    deleteOneBlog(blog.id, blog.title, blog.author)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        {blog.author}
        <button onClick={toggleVisibility}>View More</button>
      </div>
      <div style={showWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>
          {blog.likes} <button onClick={likeBlog}>Like</button>
        </p>
        <p>{blog.url}</p>
        <button onClick={deleteBlog}>Remove</button>
      </div>
    </div>
  )
})

Blog.displayName = 'Blog'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

export default Blog
