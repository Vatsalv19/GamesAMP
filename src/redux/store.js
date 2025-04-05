// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import libraryReducer from './slices/librarySlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    library: libraryReducer,
  },
});

export default store;