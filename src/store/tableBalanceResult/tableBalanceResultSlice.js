import { createSlice } from '@reduxjs/toolkit';

export const netoResultSlice = createSlice({
  name: 'result',
  initialState: [],
  reducers: {
    addIIGG: (state, action) => {
      state.length = 0;
      action.payload.forEach((item) => state.push(item));
    },
  },
});

export const { addIIGG } = netoResultSlice.actions;

export default netoResultSlice.reducer;
