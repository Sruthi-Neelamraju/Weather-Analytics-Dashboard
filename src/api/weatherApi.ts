import axios from 'axios';
import { WeatherData, ForecastData } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
if (!API_KEY) {
  throw new Error('Missing VITE_OPENWEATHER_API_KEY in .env file. Add your OpenWeatherMap API key to .env.');
}
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw new Error('OpenWeatherMap API key is invalid or unauthorized (401). Check your VITE_OPENWEATHER_API_KEY.');
    }
    throw new Error(`Weather API request failed: ${error.response?.status} ${error.response?.statusText}`);
  }
  throw new Error('Unexpected error when calling weather API');
};

export const weatherApi = {
  getCurrentWeather: async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
    try {
      const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getForecast: async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
    return response.data;
  },

  getWeatherByCoords: async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
    const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
    return response.data;
  },

  getForecastByCoords: async (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
    return response.data;
  },
};