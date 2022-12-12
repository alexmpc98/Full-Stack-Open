import service from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG_INIT':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'BLOG_CREATE':
    return [...state, action.data]
  case 'BLOG_UPDATE': {
    const stateFilter = state.filter(s => s.id !== action.data.id)
    const newState = [...stateFilter, action.data]
    return newState.sort((a, b) => b.likes - a.likes)
  }
  case 'BLOG_REMOVE':
    return state.filter(s => s.id !== action.id)
  default:
    return state
  }
}

const initialize = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      'type': 'BLOG_INIT',
      data,
    })
  }
}

const create = (newObject) => {
  return async dispatch => {
    const data = await service.create(newObject)
    dispatch({
      'type': 'BLOG_CREATE',
      data
    })
  }
}

const update = (id, newObject) => {
  return async dispatch => {
    const data = await service.update(id, newObject)
    dispatch({
      'type': 'BLOG_UPDATE',
      data
    })
  }
}

const remove = (id) => {
  return async dispatch => {
    await service.remove(id)
    dispatch({
      'type': 'BLOG_REMOVE',
      id
    })
  }
}

const addComment = (id, comment) => {
  return async dispatch => {
    const data = await service.addComment(id, comment)
    dispatch({
      'type': 'BLOG_UPDATE',
      data
    })
  }
}

export { initialize, create, update, remove, addComment }
export default reducer
