import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
}
interface CityType {
  id: number;
  name: string;
  country: string;
  state?: string;
}

interface CitySuggestion {
  name: string;
  id: number;
  state?: string;
  country: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search for a city...' }) => {
  const [query, setQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleSelectCity = (city: CityType) => {
  onSearch(city.name); 
  setSuggestions([]);  
  setSearchText(city.name); 
};
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
        const response = await axios.get(url);
        setSuggestions(response.data.map((item: any) => ({
          name: item.name,
          state: item.state,
          country: item.country,
        })));
      } catch (error) {
        console.error('Autocomplete error:', error);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 250);
    return () => clearTimeout(timeoutId);
  }, [query, API_KEY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const chooseSuggestion = (suggestion: CitySuggestion) => {
    const cityName = suggestion.state ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}` : `${suggestion.name}, ${suggestion.country}`;
    setQuery(cityName);
    setSuggestions([]);
    setActiveIndex(-1);
    onSearch(cityName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        chooseSuggestion(suggestions[activeIndex]);
      }
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} autoComplete="off">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <FaSearch />
        </button>
      </div>
      <ul className="suggestions-dropdown">
  {suggestions.map((city) => (
    <li key={city.id} onClick={() => handleSelectCity(city)}>
      {city.name}, {city.state} ({city.country})
    </li>
  ))}
</ul>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${suggestion.country}-${index}`}
              className={activeIndex === index ? 'active' : ''}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => chooseSuggestion(suggestion)}
            >
              {suggestion.name}{suggestion.state ? `, ${suggestion.state}` : ''} ({suggestion.country})
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;