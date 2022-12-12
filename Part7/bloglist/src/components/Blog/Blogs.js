import { List } from '@material-ui/core'
import { useSelector } from 'react-redux'
import React from 'react'

import { Blog } from './Blog'
import CreateBlog from "./CreateBlog"
import Togglable from "../Togglable"

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  let dom = null
  if (user) {
    dom = (
      <div>
        <div>
          <Togglable buttonLabel='new blog'>
            <CreateBlog />
          </Togglable>
        </div>
        <div>
          <h3>contents</h3>
          <List aria-label="secondary mailbox folders">
            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
          </List>
        </div>
      </div>
    )
  }

  return dom
}

export default Blogs
