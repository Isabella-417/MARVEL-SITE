import { createSlice } from "@reduxjs/toolkit";

const watchedSlice = createSlice({
  name: "watched",
  initialState: {
    value: [],
  },
  reducers: {
    addToWatched: (state, action) => {
      const { payload } = action;
      state.value.push(payload);
    },
    removeWatched: (state, action) => {
      state.value = state.value.filter((comic) => comic !== action.payload);
    },
  },
});


export const { addToWatched, removeWatched } = watchedSlice.actions;
export default watchedSlice.reducer