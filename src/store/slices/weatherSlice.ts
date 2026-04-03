import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherData, ForecastData, WeatherState } from '../../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
if (!API_KEY) {
  throw new Error('Missing VITE_OPENWEATHER_API_KEY in .env file');
}
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, units }: { city: string; units: 'metric' | 'imperial' }) => {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
    return response.data;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ city, units }: { city: string; units: 'metric' | 'imperial' }) => {
    const response = await axios.get<ForecastData>(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );
    return response.data;
  }
);

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch forecast data';
      });
  },
});

export const { clearWeather, setError } = weatherSlice.actions;
export default weatherSlice.reducer;