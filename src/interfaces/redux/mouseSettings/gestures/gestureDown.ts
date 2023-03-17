import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const gestureDown = createSlice({
  name: "gestureDownReducer",
  initialState: {
    mode: "OnRelease",
    type: "Keypress",
    keys: ["KEY_PREVIOUSSONG"]
  },

  reducers: {
    GDownMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    GDownActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    GDownActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { GDownMode, GDownActionKey, GDownActionType } = gestureDown.actions
export default gestureDown.reducer
