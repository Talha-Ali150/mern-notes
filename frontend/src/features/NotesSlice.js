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

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ userInfo, id, newNote }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        newNote,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ userInfo, id }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
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
      })
      .addCase(editNote.pending, (state, action) => {
        state.editStatus = "loading";
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
      })
      .addCase(editNote.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.error.message;
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.editError = action.error.message;
      });
  },
});

export default NotesSlice.reducer;
