import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

import { notify } from '../../reducers/notificationReducer'
import { setUser, login, saveToLocal } from '../../reducers/userReducer'
import { useField } from '../../hooks'

const LoginForm = () => {
  const user = useSelector(state => state.user)
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login(username.value, password.value)
      dispatch(setUser(user))
      saveToLocal(user)
      dispatch(notify('Welcome.'))
    } catch {
      dispatch(notify('Wrong username or password.', 'error'))
    }
  }

  if (user) {
    return null
  }

  return (
    <div>
      <h2>log in to application</h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <TextField {...username} />
          </div>
          <div>
            <TextField {...password} />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
