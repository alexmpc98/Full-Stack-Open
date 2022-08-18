const mongoose = require("mongoose") 
const supertest = require("supertest") 
const app = require("../app") 
const api = supertest(app) 
const Blog = require("../models/blog") 
const helper = require("./test_helper") 
const bcrypt = require('bcrypt')
const User = require('../models/user')
const middleware = require('../utils/middleware')

beforeEach(async () => {
  await Blog.deleteMany({})
  const existingUser = await User.findOne({ username: 'alex2' })
  if(!existingUser){
    const passwordHash = await bcrypt.hash('alex2', 10)
    const user = new User({ username: 'alex2', name:"alex2", passwordHash })
    userSaved = await user.save()
  }
  const userAlex = await User.findOne({ username: 'alex2' })
  const newBlog = new Blog({ title: 'abc', author: "abc", url: "abc", likes: 0, user: userAlex._id})
  await newBlog.save()
  await Blog.insertMany(helper.initialBlogs)
  
}) 

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/) 
}, 100000) 

test("all blogs are returned", async () => {
  const blogs = await helper.blogsInDb();
  const response = await api.get("/api/blogs") 

  expect(response.body).toHaveLength(blogs.length) 
}) 

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs") 
  const titles = response.body.map((r) => r.title) 
  expect(titles).toContain("Test2") 
}) 

test("id exists as a property", async () => {
  const response = await api.get("/api/blogs") 
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined() 
  }) 
}) 

describe('addition of a new blog', () => {
test("0 likes is added", async () => {
  const blogsAtStart = await helper.blogsInDb() 
  const newBlog = {
    title: "abc",
    author: "abc",
    url: "abc",
  }
  
  const user = {
    username: "alex2",
    password: "alex2"
  }
  let token= '';
  await api
  .post("/api/login")
  .send(user)
  .expect(200)
  .then((res) => token = 'bearer ' + res.body.token)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .set({ 'Authorization' : token})
    .expect("Content-Type", /application\/json/) 

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1) 
  const title = blogsAtEnd.find((r) => r.title === "abc") 

  expect(title.likes).toEqual(0) 
}, 100000) 

test("a valid blog can be added", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newblog = {
    title: "testBlog",
    author: "authorTestBlog",
    url: "urlTestBlog",
    likes: 10,
  }
  
  const user = {
    username: "alex2",
    password: "alex2"
  }
  let token= '';
  await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .then((res) => token = 'bearer ' + res.body.token)

  await api
    .post("/api/blogs")
    .send(newblog)
    .expect(201)
    .set({ 'Authorization' : token})
    .expect("Content-Type", /application\/json/) 

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1) 

  const titles = blogsAtEnd.map((r) => r.title) 

  expect(titles).toContain("testBlog") 
}) 

test("blog without content is not added", async () => {
  const blogsAtStart = await helper.blogsInDb() 
  const newBlog = {
    url: "abc",
    likes: 1
  } 

  const user = {
    username: "alex2",
    password: "alex2"
  }
  let token= '';
  await api
  .post("/api/login")
  .send(user)
  .expect(200)
  .then((res) => token = 'bearer ' + res.body.token)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ 'Authorization' : token})
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length) 
} , 100000)

test("401 if token is not provided", async () => {
  const blogsAtStart = await helper.blogsInDb() 
  const newBlog = {
    url: "abc",
    likes: 1
  } 

  const user = {
    username: "alex2",
    password: "alex2"
  }
  let token= '';
  await api
  .post("/api/login")
  .send(user)
  .expect(200)
  .then((res) => token = 'bearer ' + res.body.token)

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ 'Authorization' : 'bearer '})
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length) 
} , 100000) 
})

test('fails with statuscode 404 if blog does not exist', async () => {
  const validNonexistingId = await helper.nonExistingId()

  await api
    .get(`/api/blogs/${validNonexistingId}`)
    .expect(404)
})

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb() 

  const blogToView = blogsAtStart[0] 

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/) 

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView)) 

  expect(resultBlog.body).toEqual(processedBlogToView) 
}) 

describe('deletion of a blog', () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb() 

    const blogToDelete = blogsAtStart[0]

    const user = {
      username: "alex2",
      password: "alex2"
    }

    let token= '';
    await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .then((res) => token = 'bearer ' + res.body.token)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set({ 'Authorization' : token}).expect(204) 

    const blogsAtEnd = await helper.blogsInDb() 

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1) 

    const titles = blogsAtEnd.map((r) => r.title) 

    expect(titles).not.toContain(blogToDelete.title) 
  })
})

describe('updating a blog', () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToUpdate = blogsAtStart[0]
    const user = {
      username: "alex2",
      password: "alex2"
    }

    let token= '';
    await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .then((res) => token = 'bearer ' + res.body.token)
    
    const likes = { likes : 10 }

    await api.put(`/api/blogs/${blogToUpdate.id}`).set({ 'Authorization' : token}).send(likes).expect(200) 

    const blogsAtEnd = await helper.blogsInDb() 

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length) 

    const title = blogsAtEnd.find((r) => r.title === blogToUpdate.title) 

    expect(title.likes).toEqual(10) 
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close() 
}) 
