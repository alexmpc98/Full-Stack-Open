import { Link } from "react-router-dom"
import { List, ListItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const User = ({ user }) => (
  <TableRow>
    <TableCell>
      <Link to={`/users/${user.id}`} >
        {user.username}
      </Link>
    </TableCell>
    <TableCell>{user.blogs.length}</TableCell>
  </TableRow>
)

const UserDetail = ({ user }) => {
  const Blog = ({ blog }) => (
    <div>
      <ListItem button>{blog.title} by {blog.author}</ListItem>
      <Divider />
    </div>
  )

  let dom = null
  if (user)
    dom = (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        <List>
          {
            user.blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />)
          }
        </List>
      </div>
    )

  return dom
}


export { UserDetail, User }
