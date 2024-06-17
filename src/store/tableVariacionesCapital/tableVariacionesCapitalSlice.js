import { createSlice } from '@reduxjs/toolkit';

export const netoResultSlice = createSlice({
  name: 'result',
  initialState: [],
  reducers: {
    addVariacion: (state, action) => {
      state.length = 0;
      action.payload.forEach((item) => state.push(item));
    },
  },
});

export const { addVariacion } = netoResultSlice.actions;

export default netoResultSlice.reducer;
