import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import React from 'react'

import { addComment } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'
import { useField } from '../../hooks'

const CreateComment = ({ blog }) => {
  const comment = useField('text', 'comment')
  const dispatch = useDispatch()

  const handleSubmit = (event, id, comment) => {
    event.preventDefault()
    dispatch(addComment(id, { comment }))
    dispatch(notify(`a new comment for ${blog.title}, ${comment}`))
  }

  return (
    <div>
      <h3>create comment</h3>
      <form onSubmit={event => handleSubmit(event, blog.id, comment.value)}>
        <div><TextField {...comment} /></div>
        <Button variant="contained" color="primary" type="submit" id='create'>create</Button>
      </form>
    </div>
  )
}

export default CreateComment