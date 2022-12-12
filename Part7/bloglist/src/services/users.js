import axios from 'axios'

import { genConfig } from './token'

const baseUrl = '/api/users'


const getAll = async () => {
  const request = await axios.get(baseUrl, genConfig())
  return request.data
}

export default {
  getAll
}