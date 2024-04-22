import { createSlice } from '@reduxjs/toolkit'

export const cajaYBcoCierreSlice = createSlice({
  name: 'resultcaja',
  initialState: "",
  reducers: {
    addResult: (state, action) => action.payload
  },
})

export const { addResult } = cajaYBcoCierreSlice.actions

export default cajaYBcoCierreSlice.reducer