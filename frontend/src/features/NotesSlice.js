import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
        "https://mern-notes-ten.vercel.app/api/notes",
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
        "https://mern-notes-ten.vercel.app/api/notes/create",
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
        `https://mern-notes-ten.vercel.app/api/notes/${id}`,
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
        `https://mern-notes-ten.vercel.app/api/notes/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const resetAddStatus = createAction("notes/resetAddStatus");
export const resetEditStatus = createAction("notes/resetEditStatus");
export const resetDeleteStatus = createAction("notes/resetDeleteStatus");

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
      .addCase(addNote.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.error.message;
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
        state.deleteError = action.error.message;
      })
      .addCase(resetAddStatus, (state) => {
        state.addStatus = "idle";
      })
      .addCase(resetEditStatus, (state) => {
        state.editStatus = "idle";
      })
      .addCase(resetDeleteStatus, (state) => {
        state.deleteStatus = "idle";
      });
  },
});

export default NotesSlice.reducer;
