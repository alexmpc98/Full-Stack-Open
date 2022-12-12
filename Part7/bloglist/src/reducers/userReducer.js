import axios from 'axios'

import { setToken } from "../services/token"

const loggedAppUser = 'loggedAppUser'
const baseUrl = '/api/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'USER_SET':
    setToken(null)
    if (action.user) {
      setToken(action.user.token)
    }
    return action.user
  default:
    return state
  }
}

const login = async (username, password) => {
  const response = await axios.post(baseUrl, {
    username, password
  })
  return response.data
}

const saveToLocal = (user) => {
  window.localStorage.setItem(
    loggedAppUser,
    JSON.stringify(user)
  )
}

const logout = () => {
  window.localStorage.removeItem(loggedAppUser)
}

const setUser = (user) => ({
  'type': 'USER_SET',
  user
})

export { setUser, login, logout, saveToLocal }
export default reducer
