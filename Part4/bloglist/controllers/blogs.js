const blogsRouter = require("express").Router()  
const Blog = require("../models/blog")  

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})  

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body  

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes? body.likes : 0
  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})  

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
