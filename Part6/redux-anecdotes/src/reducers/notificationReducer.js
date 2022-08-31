import { createSlice } from '@reduxjs/toolkit'
let timer

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        return state = action.payload
      },
    },
  })

  export const setNotificationContent = (content, time) => {
    return async dispatch => {
      dispatch(setNotification(content))
      clearTimeout(timer)
      timer = setTimeout(() => {
        dispatch(setNotification(''))
      }, time * 1000)
    }
  }

export default notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions