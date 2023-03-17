import { createSlice } from '@reduxjs/toolkit'

export const hiresscroll = createSlice({
  name: "hiresscrollReducer",
  initialState: {
    hires: false,
    invert: false,
    target: false
  },

  reducers: {
    toggleHiresscroll: (state) => {
      state.hires = !state.hires
    },
    invertHiresscroll: (state) => {
      state.hires = !state.hires
    },
    targetHiresscroll: (state) => {
      state.target = !state.target
    },

  }
});

export const { toggleHiresscroll, invertHiresscroll, targetHiresscroll } = hiresscroll.actions
export default hiresscroll.reducer
