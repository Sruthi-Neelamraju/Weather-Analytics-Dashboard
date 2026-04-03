import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ComposedChart,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { ForecastData } from '../types';
import WindDirection from './WindDirection';
import './WeatherChart.css';

interface WeatherChartProps {
  forecast: ForecastData;
  units: 'metric' | 'imperial';
}

type ChartType = 'temperature' | 'precipitation' | 'wind' | 'humidity';

const WeatherChart: React.FC<WeatherChartProps> = ({ forecast, units }) => {
  const [chartType, setChartType] = useState<ChartType>('temperature');
  const [timeRange, setTimeRange] = useState<'24h' | '5d'>('24h');

  const processedData = useMemo(() => {
    const data = timeRange === '24h' ? forecast.list.slice(0, 8) : forecast.list;

    return data.map((item) => {
      const date = new Date(item.dt * 1000);
      const isHourly = timeRange === '24h';

      return {
        time: isHourly
          ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleString(),
        temperature: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        feelsLike: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
        windDeg: item.wind.deg,
        windGust: item.wind.gust || item.wind.speed,
        precipitation: item.pop * 100, // Convert to percentage
        rain: item.rain?.['3h'] || 0,
        snow: item.snow?.['3h'] || 0,
        clouds: item.clouds.all,
        visibility: item.visibility / 1000, // Convert to km
        weather: item.weather[0],
        dt: item.dt
      };
    });
  }, [forecast, timeRange]);

  const getTemperatureLabel = () => units === 'metric' ? '°C' : '°F';
  const getWindLabel = () => units === 'metric' ? 'm/s' : 'mph';
  const getPrecipitationLabel = () => units === 'metric' ? 'mm' : 'in';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{data.fullDate}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`tooltip-value tooltip-${entry.dataKey}`}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'temperature' && getTemperatureLabel()}
              {entry.dataKey === 'windSpeed' && ` ${getWindLabel()}`}
              {entry.dataKey === 'precipitation' && '%'}
              {entry.dataKey === 'humidity' && '%'}
              {entry.dataKey === 'rain' && ` ${getPrecipitationLabel()}`}
              {entry.dataKey === 'snow' && ` ${getPrecipitationLabel()}`}
            </p>
          ))}
          <p className="weather-condition">{data.weather.description}</p>
        </div>
      );
    }
    return null;
  };

  const renderTemperatureChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <YAxis
          yAxisId="temp"
          label={{ value: `Temperature (${getTemperatureLabel()})`, angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <YAxis
          yAxisId="humidity"
          orientation="right"
          label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          yAxisId="temp"
          type="monotone"
          dataKey="tempMax"
          stackId="1"
          stroke="none"
          fill="#ff7c7c"
          fillOpacity={0.3}
          name="Max Temp"
        />
        <Area
          yAxisId="temp"
          type="monotone"
          dataKey="tempMin"
          stackId="2"
          stroke="none"
          fill="#7cb5ff"
          fillOpacity={0.3}
          name="Min Temp"
        />
        <Line
          yAxisId="temp"
          type="monotone"
          dataKey="temperature"
          stroke="#ff6b35"
          strokeWidth={3}
          dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#ff6b35', strokeWidth: 2 }}
          name="Temperature"
        />
        <Line
          yAxisId="temp"
          type="monotone"
          dataKey="feelsLike"
          stroke="#ff4081"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#ff4081', strokeWidth: 2, r: 3 }}
          name="Feels Like"
        />
        <Line
          yAxisId="humidity"
          type="monotone"
          dataKey="humidity"
          stroke="#4caf50"
          strokeWidth={2}
          dot={{ fill: '#4caf50', strokeWidth: 2, r: 3 }}
          name="Humidity"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderPrecipitationChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <YAxis
          yAxisId="precip"
          label={{ value: 'Precipitation (%)', angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <YAxis
          yAxisId="amount"
          orientation="right"
          label={{ value: `Amount (${getPrecipitationLabel()})`, angle: 90, position: 'insideRight' }}
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="precip"
          dataKey="precipitation"
          fill="#2196f3"
          name="Precipitation Chance"
          radius={[2, 2, 0, 0]}
        />
        <Line
          yAxisId="amount"
          type="monotone"
          dataKey="rain"
          stroke="#ff9800"
          strokeWidth={3}
          dot={{ fill: '#ff9800', strokeWidth: 2, r: 4 }}
          name="Rain"
        />
        <Line
          yAxisId="amount"
          type="monotone"
          dataKey="snow"
          stroke="#9c27b0"
          strokeWidth={3}
          dot={{ fill: '#9c27b0', strokeWidth: 2, r: 4 }}
          name="Snow"
        />
        <ReferenceLine yAxisId="precip" y={50} stroke="#f44336" strokeDasharray="5 5" label="Heavy Rain" />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderWindChart = () => (
    <div className="wind-chart-container">
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis
            label={{ value: `Wind Speed (${getWindLabel()})`, angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="windSpeed"
            fill="#4caf50"
            name="Wind Speed"
            radius={[2, 2, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="windGust"
            stroke="#f44336"
            strokeWidth={3}
            dot={{ fill: '#f44336', strokeWidth: 2, r: 4 }}
            name="Wind Gust"
          />
        </ComposedChart>
      </ResponsiveContainer>

    <div className="wind-directions-grid"
      style={{ gridTemplateColumns: `repeat(${timeRange === '24h' ? 4 : 3}, 1fr)` }}>
        {processedData.slice(0, timeRange === '24h' ? 4 : 3).map((item, index) => (
          <div key={index} className="wind-direction-item">
            <div className="wind-time-label">{item.time}</div>
            <WindDirection degree={item.windDeg} speed={item.windSpeed} units={units} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderHumidityChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <YAxis
          label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#ccc' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#2196f3"
          fill="#2196f3"
          fillOpacity={0.6}
          name="Humidity"
        />
        <Area
          type="monotone"
          dataKey="clouds"
          stroke="#9e9e9e"
          fill="#9e9e9e"
          fillOpacity={0.4}
          name="Cloud Cover"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'temperature':
        return renderTemperatureChart();
      case 'precipitation':
        return renderPrecipitationChart();
      case 'wind':
        return renderWindChart();
      case 'humidity':
        return renderHumidityChart();
      default:
        return renderTemperatureChart();
    }
  };

  return (
    <div className="weather-chart">
      <div className="chart-header">
        <h3>Weather Analytics</h3>
        <div className="chart-controls">
          <div className="control-group">
            <label>Chart Type:</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="chart-select"
              aria-label="Select chart type"
            >
              <option value="temperature">Temperature Trends</option>
              <option value="precipitation">Precipitation</option>
              <option value="wind">Wind Speed</option>
              <option value="humidity">Humidity & Clouds</option>
            </select>
          </div>
          <div className="control-group">
            <label>Time Range:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '24h' | '5d')}
              className="chart-select"
              aria-label="Select time range"
            >
              <option value="24h">Next 24 Hours</option>
              <option value="5d">Next 5 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>

   <div className="chart-info">
        <p className="chart-description">
          {chartType === 'temperature' && 'Shows temperature trends with min/max ranges, feels-like temperature, and humidity levels.'}
          {chartType === 'precipitation' && 'Displays precipitation probability and amounts for rain and snow.'}
          {chartType === 'wind' && 'Shows wind speed and gust patterns over time.'}
          {chartType === 'humidity' && 'Displays humidity levels and cloud cover percentage.'}
        </p>
      </div>

    </div>
  );
};

export default WeatherChart;