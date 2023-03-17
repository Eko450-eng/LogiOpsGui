import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const thumbwheelLeft = createSlice({
  name: "thumbwheelLeftReducer",
  initialState: {
    mode: "OnInterval",
    pixels: 2,
    type: "Keypress",
    keys: ["KEY_VOLUMEDOWN"]

  },

  reducers: {
    TWLeftMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    TWLeftPixels: (state, action: PayloadAction<number>) => {
      state.pixels = action.payload
    },
    TWLeftActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    TWLeftActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { TWLeftMode, TWLeftPixels, TWLeftActionKey, TWLeftActionType } = thumbwheelLeft.actions
export default thumbwheelLeft.reducer
