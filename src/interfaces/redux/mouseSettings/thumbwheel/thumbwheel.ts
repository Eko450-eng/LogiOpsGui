import { createSlice } from '@reduxjs/toolkit'

export const thumbwheel = createSlice({
  name: "thumbwheelReducer",
  initialState: {
    divert: true,
    invert: false,
  },

  reducers: {
    TWInvert: (state) => {
      state.invert = !state.invert
    },
    TWDivert: (state) => {
      state.divert = !state.divert
    },

  }
});

export const { TWDivert, TWInvert } = thumbwheel.actions
export default thumbwheel.reducer
