import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        return state = "you voted " + action.payload
      },
      removeNotification(state, action){
        return state= initialState
      }
    },
  })

export default notificationSlice.reducer;
export const { setNotification, removeNotification } = notificationSlice.actions