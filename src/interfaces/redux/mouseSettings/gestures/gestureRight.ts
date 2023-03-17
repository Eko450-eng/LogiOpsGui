import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const gestureRight = createSlice({
  name: "gestureRightReducer",
  initialState: {
    mode: "OnRelease",
    type: "Keypress",
    keys: ["KEY_LEFTCTRL", "KEY_PAGEDOWN"]
  },

  reducers: {
    GRightMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    GRightActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    GRightActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { GRightMode, GRightActionKey, GRightActionType } = gestureRight.actions
export default gestureRight.reducer
