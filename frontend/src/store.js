import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./features/userLoginSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
  },
});
