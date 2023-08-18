import { createSlice } from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {},
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    userLoginResponse: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      return {};
    },
  },
});

// Extract action creators
export const {
  userLoginRequest,
  userLoginResponse,
  userLoginFailure,
  userLogout,
} = userLoginSlice.actions;

// Export the reducer
export default userLoginSlice.reducer;
