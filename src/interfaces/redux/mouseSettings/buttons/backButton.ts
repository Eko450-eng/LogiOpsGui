import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const backButton = createSlice({
  name: "backButtonReducer",
  initialState: {
    type: "Keypress",
    keys: ["KEY_BACK"]
  },

  reducers: {
    BackBtnActionType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    BackBtnActionKey: (state, action: PayloadAction<string>) => {
      state.keys = [action.payload]
    },
  }
});

export const { BackBtnActionKey, BackBtnActionType } = backButton.actions
export default backButton.reducer
