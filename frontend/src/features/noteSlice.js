// // import { createSlice } from "@reduxjs/toolkit";

// // const noteSlice = createSlice({
// //   name: "noteSlice",
// //   initialState: {},
// //   reducers: {
// //     noteRequest: (state) => {
// //       state.loading = true;
// //       state.error = false;
// //     },
// //     noteResponse: (state, action) => {
// //       state.loading = false;
// //       state.userInfo = action.payload;
// //     },
// //     noteFailure: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //   },
// // });

// // // Extract action creators
// // export const { noteRequest, noteResponse, noteFailure } = noteSlice.actions;

// // // Export the reducer
// // export default noteSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const listNotes = createAsyncThunk(
//   "notes/listNotes",
//   async (_, { getState }) => {
//     try {
//       const {
//         userLogin: { userInfo },
//       } = getState();
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       const response = await axios.get("http://localhost:5000/notes", config);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const initialState = {
//   notes: [],
//   status: "idle",
//   error: null,
// };

// const notesSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(listNotes.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(listNotes.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.notes = action.payload;
//       })
//       .addCase(listNotes.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default notesSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for fetching all notes
// export const fetchAllNotes = createAsyncThunk(
//   "notes/fetchAllNotes",
//   async (userInfo) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo}`,
//         },
//       }; // Adjust the URL as needed
//       const response = await axios.get("http://localhost:5000/notes", config);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// // Define the initial state
// const initialState = {
//   notes: [],
//   status: "idle",
//   error: null,
// };

// // Create a slice
// const notesSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllNotes.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchAllNotes.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.notes = action.payload;
//       })
//       .addCase(fetchAllNotes.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default notesSlice.reducer;

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

const notesSlice = createSlice({
  name: "notes",
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

export default notesSlice.reducer;
