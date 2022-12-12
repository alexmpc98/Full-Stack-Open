import { Button, List, ListItem } from '@material-ui/core'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import React from 'react'

import { initialize as userInit } from '../../reducers/usersReducer'
import { notify } from '../../reducers/notificationReducer'
import { update, remove } from '../../reducers/blogReducer'
import Comments from '../Comments/Comments'

const Blog = ({ blog }) => (
  <div>
    <ListItem button component={Link} to={`/blogs/${blog.id}`}>
      {blog.title} by {blog.author}
    </ListItem>
    <Divider />
  </div>
)

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()

  let dom = null
  if (blog) {
    const handleLikeChange = async (blog) => {
      dispatch(update(blog.id, {
        ...blog,
        'likes': blog.likes + 1,
      }))
      dispatch(notify(`blog likes+1 ${blog.title} by ${blog.author}`))
    }

    const handleRemove = async (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(remove(blog.id))
        dispatch(notify(`Removed blog ${blog.title} by ${blog.author}`, 'error'))
        dispatch(userInit())
      }
    }

    dom = (
      <div>
        <List>
          <h2>{blog.title}</h2>
          <ListItem button>{blog.url}</ListItem>
          <Divider />
          <ListItem button>
            {blog.likes} <Button variant="contained" onClick={() => handleLikeChange(blog)}>like</Button>
          </ListItem>
          <Divider />
          <ListItem button>added by {blog.author}</ListItem>
          <Divider />
          <Button variant="contained" onClick={() => handleRemove(blog)}>remove</Button>
          <Divider />
        </List>

        <div>
          <h2>Comments</h2>
          <Comments blog={blog} />
        </div>
      </div>
    )
  }

  return dom
}

export { Blog, BlogDetail }
