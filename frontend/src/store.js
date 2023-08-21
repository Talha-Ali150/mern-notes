import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./features/userLoginSlice";
import noteSlice from "./features/noteSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
    userNote: noteSlice,
  },
});
