import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const thumbwheelRight = createSlice({
  name: "thumbwheelRightReducer",
  initialState: {
    mode: "OnInterval",
    pixels: 2,
    type: "Keypress",
    keys: ["KEY_VOLUMEUP"]

  },
  reducers: {
    TWRightMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    TWRightPixels: (state, action: PayloadAction<number>) => {
      state.pixels = action.payload
    },
    TWRightActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    TWRightActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { TWRightMode, TWRightPixels, TWRightActionKey, TWRightActionType } = thumbwheelRight.actions
export default thumbwheelRight.reducer
