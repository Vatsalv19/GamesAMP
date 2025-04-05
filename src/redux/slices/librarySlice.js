// redux/slices/librarySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: localStorage.getItem('favorites') 
    ? JSON.parse(localStorage.getItem('favorites')) 
    : [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      if (!state.favorites.some(game => game.id === action.payload.id)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromLibrary: (state, action) => {
      state.favorites = state.favorites.filter(game => game.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;