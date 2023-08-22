import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./features/userLoginSlice";
import getNoteSlice from "./features/getNoteSlice";
import addNoteSlice from "./features/addNoteSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
    getNote: getNoteSlice,
    addNote: addNoteSlice,
  },
});
