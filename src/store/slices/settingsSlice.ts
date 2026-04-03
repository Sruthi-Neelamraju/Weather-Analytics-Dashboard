import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';

const initialState: SettingsState = {
  units: (localStorage.getItem('weatherUnits') as 'metric' | 'imperial') || 'metric',
  theme: (localStorage.getItem('weatherTheme') as 'light' | 'dark') || 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<'metric' | 'imperial'>) => {
      state.units = action.payload;
      localStorage.setItem('weatherUnits', action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('weatherTheme', action.payload);
    },
  },
});

export const { setUnits, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;