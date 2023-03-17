import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const thumbwheelTap = createSlice({
  name: "thumbwheelTapReducer",
  initialState: {
    type: "Keypress",
    keys: ["KEY_VOLUMEUP"]
  },

  reducers: {
    TWTapctionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    TWTapActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
    TWRightActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { TWTapActionKey, TWTapctionType } = thumbwheelTap.actions
export default thumbwheelTap.reducer
