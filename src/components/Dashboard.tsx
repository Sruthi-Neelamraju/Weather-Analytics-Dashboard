import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useWeather, useForecast } from '../hooks/useWeather';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import FavoritesList from './FavoritesList';
import Settings from './Settings';
import { FavoriteCity } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const units = useSelector((state: RootState) => state.settings.units);

  const { data: weather, isLoading: weatherLoading, error: weatherError } = useWeather(selectedCity, units);
  const { data: forecast, isLoading: forecastLoading } = useForecast(selectedCity, units);

  const handleSearch = (city: string) => {
    setSelectedCity(city);
  };

  const handleCitySelect = (city: FavoriteCity) => {
    setSelectedCity(city.name);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
  <h1>Weather Analytics Dashboard</h1>
  {/* Ensure this component is only called ONCE here */}
  <SearchBar onSearch={handleSearch} /> 
</div>

      <div className="dashboard-content">
        <div className="main-content">
          {selectedCity && (
            <>
              {weatherLoading && <div className="loading">Loading weather data...</div>}
              {weatherError && <div className="error">Error: {weatherError.message}</div>}

              {weather && (
                <div className="weather-section">
                  <WeatherCard weather={weather} units={units} />
                  {forecast && !forecastLoading && (
                    <WeatherChart forecast={forecast} units={units} />
                  )}
                </div>
              )}
            </>
          )}

          {!selectedCity && (
            <div className="welcome-message">
              <h2>Welcome to Weather Analytics</h2>
              <p>Search for a city to view current weather and forecast data.</p>
            </div>
          )}
        </div>

        <div className="sidebar">
          <Settings />
          <FavoritesList onCitySelect={handleCitySelect} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;