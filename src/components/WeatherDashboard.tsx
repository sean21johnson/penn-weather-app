import { FC } from "react";
import WeatherSummary from "./WeatherSummary";
import WeatherDetails from "./WeatherDetails";
import CitySearch from "./CitySearch";
import useWeatherData from "../hooks/useWeatherData";
import styles from "../styles/WeatherDashboard.module.css";

const WeatherDashboard: FC = () => {
  const {
    city,
    error,
    handleClickGeolocation,
    handleSubmitForm,
    setCity,
    weatherData,
  } = useWeatherData();

  return (
    <div className={styles.main}>
      <CitySearch
        city={city}
        onSubmitForm={handleSubmitForm}
        setCity={setCity}
        aria-label="Enter city name to get weather details"
        onClickGeolocation={handleClickGeolocation}
      />

      {error && (
        <div className={styles.error} role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {weatherData && (
        <div
          className={styles.content}
          role="region"
          aria-labelledby="weather-report"
        >
          <WeatherSummary
            airQuality={weatherData.airQuality}
            description={weatherData.weather[0].description}
            highTemp={weatherData.main.temp_max.toFixed(0)}
            lowTemp={weatherData.main.temp_min.toFixed(0)}
            name={weatherData.name}
            temp={weatherData.main.temp.toFixed(0)}
          />
          <WeatherDetails
            feelsLike={weatherData.main.feels_like.toFixed(0)}
            humidity={weatherData.main.humidity}
            pressure={weatherData.main.pressure}
            visibility={weatherData.visibility}
            windSpeed={weatherData.wind.speed.toFixed(0)}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
