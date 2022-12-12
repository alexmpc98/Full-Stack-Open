import { ListItem, List } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import React from 'react'

import CreateComment from "./CreateComment"
import Togglable from "../Togglable"

const Comment = ({ comment }) => (
  <div>
    <ListItem button>
      {comment}
    </ListItem>
    <Divider />
  </div>
)

const Comments = ({ blog }) => (
  <div>
    <div>
      <Togglable buttonLabel='add comment'>
        <CreateComment blog={blog} />
      </Togglable>
    </div>
    <div>
      <h3>Comments list</h3>
      <List aria-label="secondary mailbox folders">
        {
          blog.comments.map((comment, index) =>
            <Comment key={index} comment={comment} />)
        }
      </List>

    </div>
  </div>
)


export default Comments
