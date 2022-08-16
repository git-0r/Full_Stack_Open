import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationSlice";
import anecdoteReducer from "../reducers/anecdoteSlice";
import filterReducer from "../reducers/filterSlice";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});
