import { createSlice } from '@reduxjs/toolkit'

export const netoResultSlice = createSlice({
  name: 'result',
  initialState: [],
  reducers: {
    addCajaCierre: (state, action) => {
      // Clear the current state
      state.length = 0;
      // Add new items
      action.payload.forEach(item => state.push(item));
    }
  },
})

export const { addCajaCierre } = netoResultSlice.actions

export default netoResultSlice.reducer