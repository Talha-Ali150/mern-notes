// import { configureStore } from "@reduxjs/toolkit";
// import userLoginSlice from "./features/userLoginSlice";
// import NotesSlice from "./features/NotesSlice";

// export const store = configureStore({
//   reducer: {
//     userLogin: userLoginSlice,
//     notes: NotesSlice,
//   },
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userLoginSlice from "./features/userLoginSlice";
import NotesSlice from "./features/NotesSlice";
import thunk from "redux-thunk";

// Configure Redux Persist
const persistConfig = {
  key: "root", // Storage key
  version: 1, // Version of your persisted state
  storage, // Storage engine (localStorage or AsyncStorage)
};

// Combine your reducers
const rootReducer = combineReducers({
  userLogin: userLoginSlice,
  notes: NotesSlice,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Create the persistor for persisting the store
export const persistor = persistStore(store);
