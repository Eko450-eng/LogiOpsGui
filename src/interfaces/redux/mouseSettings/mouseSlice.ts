import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const mouse = createSlice({
  name: "mouseReducer",
  initialState: {
    name: "MX Master 3S",
    dpi: 1000
  },

  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    changeDPI: (state, action: PayloadAction<number>) => {
      state.dpi = action.payload;
    }
  }
});

export const { changeName, changeDPI } = mouse.actions
export default mouse.reducer
