import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../api/weatherApi';
import { WeatherData, ForecastData } from '../types';

export const useWeather = (city: string, units: 'metric' | 'imperial' = 'metric') => {
  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: () => weatherApi.getCurrentWeather(city, units),
    enabled: !!city,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};

export const useForecast = (city: string, units: 'metric' | 'imperial' = 'metric') => {
  return useQuery({
    queryKey: ['forecast', city, units],
    queryFn: () => weatherApi.getForecast(city, units),
    enabled: !!city,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};

export const useWeatherByCoords = (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') => {
  return useQuery({
    queryKey: ['weather', lat, lon, units],
    queryFn: () => weatherApi.getWeatherByCoords(lat, lon, units),
    enabled: !!(lat && lon),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
};

export const useForecastByCoords = (lat: number, lon: number, units: 'metric' | 'imperial' = 'metric') => {
  return useQuery({
    queryKey: ['forecast', lat, lon, units],
    queryFn: () => weatherApi.getForecastByCoords(lat, lon, units),
    enabled: !!(lat && lon),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
};