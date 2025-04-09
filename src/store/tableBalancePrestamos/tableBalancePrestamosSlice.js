import { createSlice } from '@reduxjs/toolkit';

export const netoResultSlice = createSlice({
  name: 'tableBalancePrestamos',
  initialState: [],
  reducers: {
    addPrestamos: (state, action) => {
      state.length = 0;
      action.payload.forEach((item) => state.push(item));
    },
  },
});

export const { addPrestamos } = netoResultSlice.actions;

export default netoResultSlice.reducer;
