// redux/slices/gamesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGames, searchGames } from '../../services/api';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getGames(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  'games/fetchSearchResults',
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchGames(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    category: '',
    tags: [],
    year: '',
    ordering: '-rating', // Default sorting by popularity
  },
  currentPage: 1,
  searchQuery: '',
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results;
        state.total = action.payload.count;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results;
        state.total = action.payload.count;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setSearchQuery } = gamesSlice.actions;
export default gamesSlice.reducer;