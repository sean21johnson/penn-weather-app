# Weather App

This Weather App allows users to fetch weather information for any city or based on their geolocation. It provides key details such as temperature, air quality, humidity, and more.

## Features

- **City Search**: Users can enter a city name to get the current weather.
- **Geolocation**: Users can fetch weather for their current location using the "Use Geolocation" button.
- **Detailed Weather Information**: Displays temperature, air quality, humidity, wind speed, visibility, and pressure.

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js (v14 or above)
- npm or yarn

## Getting Started

1. **Clone the repository:**

- git clone https://github.com/your-username/weather-app.git
- cd weather-app

2. **Install Dependencies:**

npm install

# or

yarn install

3. **Create a .env file in the root of the project and add your OpenWeatherMap API key**

- REACT_APP_WEATHER_API_KEY=YOUR_API_KEY

4. **Run the app**

npm start

# or

yarn start

5. **Running tests**

npm test

# or

yarn test

## Project Structure

├── src
│ ├── components
│ │ ├── CitySearch.tsx # Search component for entering city or using geolocation
│ │ ├── WeatherDashboard.tsx # Main dashboard to display weather information
│ │ ├── WeatherDetails.tsx # Component to display detailed weather info (humidity, pressure, etc.)
│ │ ├── WeatherDetail.tsx # Individual weather detail item (label-value pair)
│ │ ├── WeatherSummary.tsx # Component to display a summarized view of the weather
│ ├── hooks
│ │ └── useWeatherData.tsx # Custom hook for managing weather data fetching and state
│ ├── styles
│ │ ├── CitySearch.module.css # Styles for CitySearch component
│ │ ├── WeatherDashboard.module.css # Styles for WeatherDashboard component
│ │ ├── WeatherDetails.module.css # Styles for WeatherDetails component
│ │ ├── WeatherSummary.module.css # Styles for WeatherSummary component
│ │ ├── WeatherDetail.module.css # Styles for WeatherDetail component
│ ├── App.tsx # Main entry point for the app's component tree
│ └── index.tsx # Entry point for rendering the React application
├── .env # Environment variables file
├── package.json # Project metadata and dependencies
└── tsconfig.json # TypeScript configuration

## Dependencies

- React
- TypeScript
- OpenWeatherMap API
- Jest & React Testing Library
