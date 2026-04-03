import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { RootState } from '../store/store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { useWeather, useForecast } from '../hooks/useWeather';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import { FavoriteCity } from '../types';
import './CityDetail.css';

const CityDetail: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const units = useSelector((state: RootState) => state.settings.units);
  const favorites = useSelector((state: RootState) => state.favorites.cities);

  const { data: weather, isLoading: weatherLoading, error: weatherError } = useWeather(cityName || '', units);
  const { data: forecast, isLoading: forecastLoading } = useForecast(cityName || '', units);

  const isFavorite = weather ? favorites.some(city => city.id === weather.id) : false;

  const handleToggleFavorite = () => {
    if (!weather) return;

    const favoriteCity: FavoriteCity = {
      id: weather.id,
      name: weather.name,
      country: weather.sys.country,
      coord: weather.coord,
      addedAt: Date.now(),
    };

    if (isFavorite) {
      dispatch(removeFavorite(weather.id));
    } else {
      dispatch(addFavorite(favoriteCity));
    }
  };

  if (!cityName) {
    return <div>City not found</div>;
  }

  return (
    <div className="city-detail">
      <div className="city-detail-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        {weather && (
          <button className="favorite-button" onClick={handleToggleFavorite}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
      </div>

      {weatherLoading && <div className="loading">Loading weather data...</div>}
      {weatherError && <div className="error">Error: {weatherError.message}</div>}

      {weather && (
        <div className="city-detail-content">
          <WeatherCard weather={weather} units={units} />
          {forecast && !forecastLoading && (
            <WeatherChart forecast={forecast} units={units} />
          )}
        </div>
      )}
    </div>
  );
};

export default CityDetail;