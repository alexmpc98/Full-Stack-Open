const blogsRouter = require("express").Router()  
const Blog = require("../models/blog")
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})  

blogsRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  User.findById(request.user._id).then((user) => {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes? request.body.likes : 0,
      user: request.user
    })

    blog.save()
      .then(savedBlog => {
        user.blogs = user.blogs.concat(savedBlog._id)
        user.save().then(() => {
          response.status(201).json(savedBlog)
        }).catch(error => next(error))
      })
      .catch(error => next(error))
  }).catch(error => next(error))
  
})  

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === request.user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  response.status(401).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: body.likes
  }
  if(blog.user.toString() === request.user._id.toString()){
    await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.status(200).end()
  }
  response.status(401).end()
})

module.exports = blogsRouter
