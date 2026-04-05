
# Weather Analytics Dashboard

A comprehensive web-based weather analytics application built with React, Redux Toolkit, and Recharts.

## Features

### Core Features
- **Dashboard**: Main screen with summary cards for multiple cities displaying current temperature, weather conditions, humidity, and wind speed with real-time updates.
- **Detailed View**: Click on a city card to view 5-7 day forecast, hour-by-hour forecast, and detailed statistics.
- **Search & Favorites**: Search bar with API-based autocomplete for cities, ability to favorite cities that persist between sessions.
- **Data Visualization**: Interactive charts showing temperature trends, precipitation patterns, and wind speed/direction using Recharts.
- **Settings**: Toggle between Celsius and Fahrenheit units.

### Technical Features
- **Real-time Data**: Fetches live weather data from OpenWeatherMap API with updates every 60 seconds.
- **Caching**: Uses React Query for efficient data caching and API call reduction.
- **State Management**: Centralized state management with Redux Toolkit for weather data, favorites, and settings.
- **Responsive Design**: Works on mobile and desktop devices.
- **Authentication**: Google Sign-In integration (bonus feature).

## Tech Stack

- **Frontend**: React 18 with Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **API Client**: Axios
- **Charts**: Recharts
- **Caching**: TanStack React Query
- **Authentication**: Firebase
- **Build Tool**: Vite
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   bash
   git clone <repository-url>
   cd weather-dashboard
   

2. Install dependencies:
   bash
   npm install
   

3. Get an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace YOUR_OPENWEATHERMAP_API_KEY in the relevant files.

4. For Google Authentication, set up Firebase and add your config.

5. Run the development server:
   bash
   npm run dev
   

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure


src/<br>
    api/           # API service functions <br>
    components/    # Reusable UI components <br>
    hooks/         # Custom React hooks <br>
    pages/         # Page components <br>
    store/         # Redux store and slices <br>
    types/         # TypeScript type definitions <br>
    utils/         # Utility functions <br>


## Available Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build
- npm run lint - Run ESLint

## API Usage

The app uses OpenWeatherMap API for weather data. You'll need to:

1. Sign up for a free API key
2. Replace the placeholder API key in the code
3. Note the rate limits for the free tier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

