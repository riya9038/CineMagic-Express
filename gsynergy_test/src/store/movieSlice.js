import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api_key } from "../utils/constants";

export const fetchContent = createAsyncThunk(
  "movies/fetchContent",
  async ({ page }) => {
    const moviesData = await fetch(
      `${API_BASE_URL}/trending/all/day?api_key=${api_key}&sort_by=release_date.desc&page=${page}`
    );
    const parsedResponse = await moviesData.json();
    return parsedResponse;
  }
);

export const fetchSearchText = createAsyncThunk(
  "movies/fetchSearchText",
  async ({ searchText, page }) => {
    if (searchText == "") {
      const moviesData = await fetch(
        `${API_BASE_URL}/trending/all/day?api_key=${api_key}`
      );
      const parsedResponse = await moviesData.json();
      return parsedResponse;
    } else {
      const moviesData = await fetch(
        `${API_BASE_URL}/search/multi?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}`
      );
      const parsedResponse = await moviesData.json();
      return parsedResponse;
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    searchText: "",
    total_pages: 0,
    pageNumber: 0,
    movieList: [],
    error: null,
  },
  reducers: {
    handleSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearList: (state) => {
      state.movieList = [];
    },
    changePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.pageNumber != action.payload.page) {
        state.movieList = [...state.movieList, ...action.payload.results];
        state.pageNumber = action.payload.page;
      }
      state.total_pages = action.payload.total_pages;
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
    });
    builder.addCase(fetchSearchText.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { handleSearchText, clearList, changePageNumber } =
  movieSlice.actions;

export default movieSlice.reducer;
