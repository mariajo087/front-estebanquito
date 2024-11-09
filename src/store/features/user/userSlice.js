import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    updateAmount: (state, action) => {
      state.user.amount = action.payload;
    },
    clear: (state) => {
      state.user = {};
    },
  },
});

export const { loginUser, updateAmount, clear } = userSlice.actions;
export default userSlice.reducer;
