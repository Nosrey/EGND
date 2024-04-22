import { createSlice } from '@reduxjs/toolkit';

export const netoResultSlice = createSlice({
  name: 'result',
  initialState: [],
  reducers: {
    addCajaCierre: (state, action) => {
      state.length = 0;
      action.payload.forEach((item) => state.push(item));
    },
  },
});

export const { addCajaCierre } = netoResultSlice.actions;

export default netoResultSlice.reducer;
