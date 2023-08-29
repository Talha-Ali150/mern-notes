import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async ({ userInfo, }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       const response = await axios.post(
//         "https://mern-notes-ten.vercel.app/api/users/profile",
//         user,
//         config
//       );
//       return response.data; // Return the response data
//     } catch (error) {
//       throw error; // Re-throw the error to be handled by the Redux thunk
//     }
//   }
// );

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userInfo, updatedUser }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.post(
        "https://mern-notes-ten.vercel.app/api/users/profile",
        updatedUser,
        config
      );
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Re-throw the error to be handled by the Redux thunk
    }
  }
);

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
    // userUpdateRequest: (state) => {
    //   state.updateLoading = true;
    //   state.updateError = false;
    // },
    // userUpdateResponse: (state, action) => {
    //   state.updateLoading = false;
    //   state.updateUserInfo = action.payload;
    // },
    // userUpdateFailure: (state, action) => {
    //   state.updateLoading = false;
    //   state.updateError = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.updateStatus = "loading";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updateStatus = "succeeded";
      state.userInfo = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.updateError = action.error.message;
    });
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
