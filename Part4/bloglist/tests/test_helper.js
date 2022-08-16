const Blog = require('../models/blog')

const initialBlogs=[
    {
        title: 'Test',
        author: 'TestAuthor',
        url: 'TestUrl',
        likes: 20
      },
      {
        title: 'Test2',
        author: 'TestAuthor2',
        url: 'TestUrl2',
        likes: 10
      },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon', likes: 0})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}