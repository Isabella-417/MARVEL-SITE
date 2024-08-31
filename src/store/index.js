import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favorite/favoriteSlice";
import watchedReducer from "../features/wacthed/watchedSlice";


export const store = configureStore({
    reducer: {
        favorite: favoriteReducer,
        watched: watchedReducer,
    }
})

export default store;