import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./features/userLoginSlice";
import NotesSlice from "./features/NotesSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
    notes: NotesSlice,
  },
});
