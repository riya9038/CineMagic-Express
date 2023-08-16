import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

const appStore = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default appStore;
