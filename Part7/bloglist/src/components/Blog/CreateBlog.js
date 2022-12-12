import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import React from 'react'

import { create } from '../../reducers/blogReducer'
import { initialize as userInit } from '../../reducers/usersReducer'
import { notify } from '../../reducers/notificationReducer'
import { useField } from '../../hooks'

const CreateBlog = () => {
  const title = useField('text', 'title')
  const author = useField('text', 'auther')
  const url = useField('text', 'url')

  const dispatch = useDispatch()

  const addBlog = (event, title, author, url) => {
    event.preventDefault()
    dispatch(create({ title, author, url }))
    dispatch(notify(`a new blog ${title} by ${author}`))
    dispatch(userInit())
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={event => addBlog(event, title.value, author.value, url.value)}>
        <div><TextField {...title} /></div>
        <div><TextField {...author} /></div>
        <div><TextField {...url} /></div>
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default CreateBlog
