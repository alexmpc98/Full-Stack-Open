import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      setFilter(state, action) {
        return state = action.payload
      },
    },
  })

export default filtersSlice.reducer;
export const { setFilter } = filtersSlice.actions