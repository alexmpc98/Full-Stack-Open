import axios from 'axios'

import { genConfig } from './token'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl, genConfig())
  return request.data
}

const getBlogByID = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`, genConfig())
  return request.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, genConfig())
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject, genConfig())
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, genConfig())
  return request.data
}

const addComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, genConfig())
  return request.data
}

export default {
  getAll,
  getBlogByID,
  create,
  update,
  remove,
  addComment
}
