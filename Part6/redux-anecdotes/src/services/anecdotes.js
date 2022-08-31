import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a,b) => b.votes - a.votes)
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (anecdote) => {
    let newObject = {
        content: anecdote.content,
        votes: anecdote.votes + 1
    }
    const request = axios.put(`${baseUrl}/${anecdote.id}`, newObject)
    return request.then((response) => response.data)
}

export default { getAll, createNew, addVote }