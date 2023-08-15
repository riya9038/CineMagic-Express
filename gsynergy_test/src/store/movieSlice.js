import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "../utils/constants";

export const fetchContent = createAsyncThunk(
  "movies/fetchContent",
  async (page) => {
    console.log(page, "page content");

    const moviesData = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
    );

    const parsedResponse = await moviesData.json();
    console.log("movie list", parsedResponse);

    return parsedResponse;
  }
);

export const fetchSearchText = createAsyncThunk(
  "movies/fetchSearchText",
  async ({ searchText, page }) => {
    console.log(searchText, page, "page");
    if (searchText == "") {
      const moviesData = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
      );
      const parsedResponse = await moviesData.json();
      return parsedResponse;
    } else {
      const moviesData = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      const parsedResponse = await moviesData.json();
      return parsedResponse;
    }

    // console.log("movie list", parsedResponse);
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    searchText: "",
    total_pages: 0,
    movieList: [],
    error: null,
  },
  reducers: {
    handleSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearList: (state) => {
      console.log("clear");
      state.movieList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movieList = [...state.movieList, ...action.payload.results];
      state.total_pages = action.payload.total_pages;
      // state.page = action.payload.page;
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
      state.movieList = [...state.movieList, ...action.payload.results];
      state.total_pages = action.payload.total_pages;

      // state.page = action.payload.page;
    });
    builder.addCase(fetchSearchText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { handleSearchText, clearList } = movieSlice.actions;

export default movieSlice.reducer;
