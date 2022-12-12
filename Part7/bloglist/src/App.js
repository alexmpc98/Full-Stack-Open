import { Switch, Route, useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from "react"

import { BlogDetail } from './components/Blog/Blog'
import { initialize as blogInit } from './reducers/blogReducer'
import { initialize as userInit } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { UserDetail } from './components/User/User'
import Blogs from "./components/Blog/Blogs"
import LoginForm from "./components/User/LoginForm"
import Menu from './components/Menu'
import Notification from "./components/Notification"
import Users from "./components/User/Users"

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => { dispatch(blogInit()) }, [])
  useEffect(() => { dispatch(userInit()) }, [])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Menu />
      <h1>Blogs App</h1>
      <Notification />
      <LoginForm />

      <Switch>
        <Route path="/users/:id">
          <UserDetail user={user} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetail blog={blog} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
