import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllNotes = createAsyncThunk(
  "notes/fetchAllNotes",
  async (userInfo) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/notes",
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ userInfo, newNote }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/notes/create",
        newNote,
        config
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

const NotesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.error.message;
      })
      .addCase(addNote.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.error.message;
      });
  },
});

export default NotesSlice.reducer;
