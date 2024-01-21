import { createSlice } from '@reduxjs/toolkit'

export const netoResultSlice = createSlice({
  name: 'result',
  initialState: "",
  reducers: {
    addResult: (state, action) => action.payload
  },
})

export const { addResult } = netoResultSlice.actions

export default netoResultSlice.reducer