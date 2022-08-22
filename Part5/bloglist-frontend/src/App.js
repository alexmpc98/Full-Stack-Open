import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setError(true);
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const blogsArea = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      {blogForm()}
    </div>
  );

  const blogForm = () => (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    try{
      const blogObj = {
        title: title,
        author: author,
        url: url
      }
      const note = await blogService.create(blogObj)
      setTitle('')
      setUrl('')
      setAuthor('')
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setNotificationMessage("a new blog " + note.title + " by " + note.author + " added")
      setError(false);
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    } catch(exception) {
      setNotificationMessage('Something is wrong with your submission! Check your input again.')
      setError(true);
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  };
  
  const notificationStyle = {
    color: error? "red" : "green",
    fontStyle: "italic",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div>
      { notificationMessage !== '' && (
      <div style={notificationStyle}>
        {notificationMessage}
      </div>
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
  );
};

export default App;
