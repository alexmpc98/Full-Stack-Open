import service from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS_INIT':
    return action.data.sort((a, b) => b.blogs.length - a.blogs.length)
  default:
    return state
  }
}

const initialize = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch({
      'type': 'USERS_INIT',
      data,
    })
  }
}

export { initialize }
export default reducer
