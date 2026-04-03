import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { RootState } from '../store/store';
import { removeFavorite } from '../store/slices/favoritesSlice';
import { FavoriteCity } from '../types';
import './FavoritesList.css';

interface FavoritesListProps {
  onCitySelect: (city: FavoriteCity) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ onCitySelect }) => {
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (e: React.MouseEvent, cityId: number) => {
    e.stopPropagation();
    dispatch(removeFavorite(cityId));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-list empty">
        <FaHeart className="empty-icon" />
        <p>No favorite cities yet</p>
        <p>Add cities to your favorites for quick access</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h3>Favorite Cities</h3>
      <div className="favorites-grid">
        {favorites.map((city) => (
          <div
            key={city.id}
            className="favorite-city-card"
            onClick={() => onCitySelect(city)}
          >
            <div className="city-info">
              <h4>{city.name}</h4>
              <span>{city.country}</span>
            </div>
            <button
              className="remove-favorite"
              onClick={(e) => handleRemoveFavorite(e, city.id)}
              title="Remove from favorites"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;