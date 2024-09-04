import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    value: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const { payload } = action;
      state.value.push(payload);
    },
    removeFromFavorite: (state, action) => {
      state.value = state.value.filter((comic) => comic.id !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
