import { FC } from "react";
import WeatherDetail from "./WeatherDetail";
import styles from "../styles/WeatherDetails.module.css";

const metersPerMile = 1609.34;

interface WeatherDetailsProps {
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  // Returns value in meters. Convert to miles before displaying.
  visibility: number;
}

const WeatherDetails: FC<WeatherDetailsProps> = ({
  feelsLike,
  windSpeed,
  humidity,
  pressure,
  visibility,
}) => {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Weather Details</h2>
      <div className={styles.detailsWrapper}>
        <WeatherDetail label="Feels Like" value={`${feelsLike}°F`} />
        <WeatherDetail label="ENE wind" value={`${windSpeed} mi/h`} />
        <WeatherDetail label="Humidity" value={`${humidity}%`} />
        <WeatherDetail
          label="Visibility"
          value={`${(visibility / metersPerMile).toFixed(0)} miles`}
        />
        <WeatherDetail label="Pressure" value={`${pressure} hPa`} />
      </div>
    </div>
  );
};

export default WeatherDetails;
