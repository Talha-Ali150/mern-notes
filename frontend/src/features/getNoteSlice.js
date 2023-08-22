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

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const getNotesSlice = createSlice({
  name: "getNotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getNotesSlice.reducer;
