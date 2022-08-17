const mongoose = require("mongoose") 
const supertest = require("supertest") 
const app = require("../app") 
const api = supertest(app) 
const Blog = require("../models/blog") 
const helper = require("./test_helper") 

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}) 

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/) 
}, 100000) 

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs") 

  expect(response.body).toHaveLength(helper.initialBlogs.length) 
}) 

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs") 
  const titles = response.body.map((r) => r.title) 
  expect(titles).toContain("Test2") 
}) 

test("a valid blog can be added", async () => {
  const newblog = {
    title: "testBlog",
    author: "authorTestBlog",
    url: "urlTestBlog",
    likes: 10,
  } 

  await api
    .post("/api/blogs")
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/) 

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1) 

  const titles = blogsAtEnd.map((r) => r.title) 

  expect(titles).toContain("testBlog") 
}) 

test("id exists as a property", async () => {
  const response = await api.get("/api/blogs") 
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined() 
  }) 
}) 

describe('addition of a new note', () => {
test("0 likes is added", async () => {
  const newBlog = {
    title: "abc",
    author: "abc",
    url: "abc",
  } 

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/) 

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1) 
  const title = blogsAtEnd.find((r) => r.title === "abc") 

  expect(title.likes).toEqual(0) 
}, 100000) 

test("blog without content is not added", async () => {
  const newBlog = {
    url: "abc",
    likes: 1
  } 

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb() 
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) 
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

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204) 

    const blogsAtEnd = await helper.blogsInDb() 

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1) 

    const titles = blogsAtEnd.map((r) => r.title) 

    expect(titles).not.toContain(blogToDelete.title) 
  })
})

describe('updating a blog', () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToUpdate = blogsAtStart[0]
    
    const likes = { likes : 10 }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(likes).expect(200) 

    const blogsAtEnd = await helper.blogsInDb() 

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) 

    const title = blogsAtEnd.find((r) => r.title === blogToUpdate.title) 

    expect(title.likes).toEqual(10) 
  })
})

afterAll(() => {
  mongoose.connection.close() 
}) 
