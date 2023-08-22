import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ userInfo, newNote }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/notes/create",
        config,
        newNote
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const addNoteSlice = createSlice({
  name: "addNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addNoteSlice.reducer;
