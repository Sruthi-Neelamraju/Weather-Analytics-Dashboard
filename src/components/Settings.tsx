import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { RootState } from '../store/store';
import { setUnits, setTheme } from '../store/slices/settingsSlice';
import './Settings.css';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const { units, theme } = useSelector((state: RootState) => state.settings);

  const handleUnitsChange = (newUnits: 'metric' | 'imperial') => {
    dispatch(setUnits(newUnits));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="settings">
      <h3>Settings</h3>

      <div className="setting-group">
        <label className="setting-label">Units</label>
        <div className="unit-buttons">
          <button
            className={`unit-button ${units === 'metric' ? 'active' : ''}`}
            onClick={() => handleUnitsChange('metric')}
          >
            Celsius (°C)
          </button>
          <button
            className={`unit-button ${units === 'imperial' ? 'active' : ''}`}
            onClick={() => handleUnitsChange('imperial')}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      <div className="setting-group">
        <label className="setting-label">Theme</label>
        <div className="theme-buttons">
          <button
            className={`theme-button ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      {user && (
        <div className="setting-group">
          <div className="user-info">
            <p>Signed in as: {user.displayName || user.email}</p>
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;