const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY_MESSAGE':
    return action.notification
  case 'NOTIFY_MUTE':
    return null
  default:
    return state
  }
}

const setNotification = (notification) => ({
  'type': 'NOTIFY_MESSAGE',
  notification
})

const clearNotification = () => ({
  'type': 'NOTIFY_MUTE'
})

const notify = (message, type = 'success', second = 3, duration = 1000) => {
  return async dispatch => {
    await dispatch(setNotification({ message, type }))
    setTimeout(
      async () => await dispatch(clearNotification()),
      second * duration
    )
  }
}

export { notify }
export default reducer
