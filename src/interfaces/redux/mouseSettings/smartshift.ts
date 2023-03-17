import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const smartshift = createSlice({
  name: "smartshiftReducer",
  initialState: {
    on: true,
    threshold: 30
  },

  reducers: {
    toggleSS: (state) => {
      state.on = !state.on
    },

    changeSSTreshold: (state, action: PayloadAction<number>) => {
      state.threshold = action.payload
    }
  }
});

export const { toggleSS, changeSSTreshold } = smartshift.actions
export default smartshift.reducer
