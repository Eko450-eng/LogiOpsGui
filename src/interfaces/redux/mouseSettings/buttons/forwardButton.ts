import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const forwardButton = createSlice({
  name: "forwardButtonReducer",
  initialState: {
    type: "ToggleSmartshift",
    keys: ["KEY_FORWARD"]
  },

  reducers: {
    ForwardBtnActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    ForwardBtnActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { ForwardBtnActionKey, ForwardBtnActionType } = forwardButton.actions
export default forwardButton.reducer
