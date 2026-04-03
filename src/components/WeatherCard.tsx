import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RootState } from '../store/store';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { WeatherData, FavoriteCity } from '../types';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
  units: 'metric' | 'imperial';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, units }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const isFavorite = favorites.some(city => city.id === weather.id);

  const getTemperature = (temp: number) => {
  return `${Math.round(temp)}${units === 'metric' ? '°C' : '°F'}`;

  };

  const getWindSpeed = (speed: number) => {
    return units === 'metric' ? `${speed} m/s` : `${(speed * 2.237).toFixed(1)} mph`;
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <div className="weather-card-container">
      <Link to={`/city/${weather.name}`} className="weather-card-link">
        <div className="weather-card">
          <div className="weather-header">
            <div className="city-title">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <button className="favorite-btn" onClick={handleToggleFavorite}>
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            <div className="weather-main">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <div className="temperature">
                <span className="temp">{getTemperature(weather.main.temp)}</span>
                <span className="description">{weather.weather[0].description}</span>
              </div>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-row">
              <span>Feels like:</span>
              <span>{getTemperature(weather.main.feels_like)}</span>
            </div>
            <div className="detail-row">
              <span>Humidity:</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="detail-row">
              <span>Wind:</span>
              <span>{getWindSpeed(weather.wind.speed)}</span>
            </div>
            <div className="detail-row">
              <span>Pressure:</span>
              <span>{weather.main.pressure} hPa</span>
            </div>
            <div className="detail-row">
              <span>Visibility:</span>
              <span>{(weather.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WeatherCard;