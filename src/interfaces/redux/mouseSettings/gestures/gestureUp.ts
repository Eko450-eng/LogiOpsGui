import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const gestureUp = createSlice({
  name: "gestureUpReducer",
  initialState: {
    mode: "OnRelease",
    type: "Keypress",
    keys: ["KEY_NEXTSONG"]
  },

  reducers: {
    GUpMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    GUpActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    GUpActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { GUpMode, GUpActionKey, GUpActionType } = gestureUp.actions
export default gestureUp.reducer
