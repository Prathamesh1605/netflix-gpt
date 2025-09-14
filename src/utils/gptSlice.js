import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearch, addGPTMovies } = gptSlice.actions;
export default gptSlice.reducer;
