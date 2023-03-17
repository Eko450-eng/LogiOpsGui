import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const centerButton = createSlice({
  name: "centerButtonReducer",
  initialState: {
    type: "ToggleSmartshift",
    keys: ["KEY_FORWARD"]
  },

  reducers: {
    CenterBtnActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    CenterBtnActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { CenterBtnActionKey, CenterBtnActionType } = centerButton.actions
export default centerButton.reducer
