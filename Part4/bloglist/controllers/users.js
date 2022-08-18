const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if(!password){
    return response.status(400).json({
      error: 'you have to provide a password'
    })
  }
  if(!username){
    return response.status(400).json({
      error: 'you have to provide a username'
    })
  }

  if(username.length < 3){
    return response.status(400).json({
      error: 'username must be longer than 3 characters'
    })
  }

  if(password.length < 3){
    return response.status(400).json({
      error: 'password must be longer than 3 characters'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User 
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.json(users)
})

module.exports = usersRouter