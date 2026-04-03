import React from 'react';
import './WindDirection.css';

interface WindDirectionProps {
  degree: number;
  speed: number;
  units: 'metric' | 'imperial';
}

const WindDirection: React.FC<WindDirectionProps> = ({ degree, speed, units }) => {
  const getDirection = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  const getWindDescription = (speed: number): string => {
    const kmh = units === 'metric' ? speed * 3.6 : speed * 1.60934;

    if (kmh < 1) return 'Calm';
    if (kmh < 6) return 'Light Air';
    if (kmh < 12) return 'Light Breeze';
    if (kmh < 20) return 'Gentle Breeze';
    if (kmh < 29) return 'Moderate Breeze';
    if (kmh < 39) return 'Fresh Breeze';
    if (kmh < 50) return 'Strong Breeze';
    if (kmh < 62) return 'Near Gale';
    if (kmh < 75) return 'Gale';
    if (kmh < 89) return 'Strong Gale';
    if (kmh < 103) return 'Storm';
    if (kmh < 118) return 'Violent Storm';
    return 'Hurricane';
  };

  const direction = getDirection(degree);
  const description = getWindDescription(speed);
  const speedLabel = units === 'metric' ? `${speed.toFixed(1)} m/s` : `${(speed * 2.237).toFixed(1)} mph`;

  return (
    <div className="wind-direction">
      <div className="wind-compass">
        <div
          className="wind-arrow"
          style={{ transform: `rotate(${degree}deg)` }}
        >
          <div className="arrow-head"></div>
          <div className="arrow-tail"></div>
        </div>
        <div className="compass-rose">
          <span className="direction-n">N</span>
          <span className="direction-e">E</span>
          <span className="direction-s">S</span>
          <span className="direction-w">W</span>
        </div>
      </div>
      <div className="wind-info">
        <div className="wind-direction-text">{direction} ({degree}°)</div>
        <div className="wind-speed">{speedLabel}</div>
        <div className="wind-description">{description}</div>
      </div>
    </div>
  );
};

export default WindDirection;