import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteCity, FavoritesState } from '../../types';

const initialState: FavoritesState = {
  cities: JSON.parse(localStorage.getItem('favoriteCities') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      const exists = state.cities.find(city => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
        localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      localStorage.setItem('favoriteCities', JSON.stringify(state.cities));
    },
    clearFavorites: (state) => {
      state.cities = [];
      localStorage.removeItem('favoriteCities');
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;