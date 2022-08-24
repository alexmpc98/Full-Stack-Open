import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const blogRef = useRef()

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.clear()
  }

  const blogsArea = () => (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            ref={blogRef}
            deleteOneBlog={deleteOneBlog}
            addLikeBlog={addLikeBlog}
          />
        ))}
      {blogForm()}
    </div>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(
          'a new blog ' +
            returnedBlog.title +
            ' by ' +
            returnedBlog.author +
            ' added'
        )
        setError(false)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
      .catch(() => {
        setNotificationMessage(
          'Something is wrong with your submission! Check your input again.'
        )
        setError(true)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
  }

  const addLikeBlog = (id, object) => {
    blogRef.current.toggleVisibility()
    blogService
      .update(id, object)
      .then(() => {
        setNotificationMessage(
          'blog ' +
            object.title +
            ' by ' +
            object.author +
            ' liked by ' +
            user.name
        )
        blogService.getAll().then((blogs) => setBlogs(blogs))
        setError(false)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
      .catch(() => {
        setNotificationMessage(
          'Something is wrong with your submission! Check your input again.'
        )
        setError(true)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
  }

  const deleteOneBlog = (id, title, author) => {
    blogRef.current.toggleVisibility()
    if (window.confirm('Remove blog ' + title + ' by ' + author)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setNotificationMessage(
            'blog ' + title + ' by ' + author + ' removed'
          )
          blogService.getAll().then((blogs) => setBlogs(blogs))
          setError(false)
          setTimeout(() => {
            setNotificationMessage('')
          }, 5000)
        })
        .catch(() => {
          setNotificationMessage(
            'Something is wrong with your operation. Are you removing a blog you created?'
          )
          setError(true)
          setTimeout(() => {
            setNotificationMessage('')
          }, 5000)
        })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const notificationStyle = {
    color: error ? 'red' : 'green',
    fontStyle: 'italic',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div>
      {notificationMessage !== '' && (
        <div style={notificationStyle}>{notificationMessage}</div>
      )}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          {blogsArea()}
        </div>
      )}
    </div>
  )
}

export default App
