import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "../utils/constants";

export const fetchContent = createAsyncThunk(
  "movies/fetchContent",
  async () => {
    const moviesData = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
    );

    const parsedResponse = await moviesData.json();
    console.log("movie list", parsedResponse);

    return parsedResponse.results;
  }
);

export const fetchSearchText = createAsyncThunk(
  "movies/fetchSearchText",
  async (searchText, page) => {
    const moviesData = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    const parsedResponse = await moviesData.json();
    console.log("movie list", parsedResponse);

    return parsedResponse.results;
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    movieList: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movieList = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchSearchText.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearchText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movieList = action.payload;
    });
    builder.addCase(fetchSearchText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// export const { addMovies } = createSlice.actions;

export default movieSlice.reducer;
