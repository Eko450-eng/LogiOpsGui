import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const gestureLeft = createSlice({
  name: "gestureLeftReducer",
  initialState: {
    mode: "OnRelease",
    type: "Keypress",
    keys: ["KEY_RIGHTCTRL", "KEY_PAGEUP"]
  },

  reducers: {
    GLeftMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    GLeftActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    GLeftActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { GLeftMode, GLeftActionKey, GLeftActionType } = gestureLeft.actions
export default gestureLeft.reducer
