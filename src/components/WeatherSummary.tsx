import { FC } from "react";
import styles from "../styles/WeatherSummary.module.css";

const capitalizeFirstLetter = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

const getCurrentDay = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = new Date().getDay();
  return daysOfWeek[currentDay].slice(0, 3);
};

const getAirQualityDescription = (airQuality: number) => {
  if (airQuality <= 50) {
    return "Good";
  } else if (airQuality <= 100) {
    return "Moderate";
  } else if (airQuality <= 150) {
    return "Unhealthy for Sensitive Groups";
  } else if (airQuality <= 200) {
    return "Unhealthy";
  } else if (airQuality <= 300) {
    return "Very Unhealthy";
  } else {
    return "Hazardous";
  }
};

interface WeatherSummaryProps {
  name: string;
  temp: number;
  description: string;
  highTemp: number;
  lowTemp: number;
  airQuality: string;
}

const WeatherSummary: FC<WeatherSummaryProps> = ({
  name,
  temp,
  description,
  highTemp,
  lowTemp,
  airQuality,
}) => {
  const airQualityDescription = getAirQualityDescription(Number(airQuality));

  return (
    <div className={styles.main}>
      <div className={styles.core}>
        <span className={styles.name}>{name}</span>
        <div
          className={styles.tempWrapper}
          aria-label={`Current temperature: ${temp} degrees and ${description}`}
        >
          <span className={styles.temp}>{temp}°</span>
          <span className={styles.description}>
            {capitalizeFirstLetter(description)}
          </span>
        </div>
      </div>
      <div className={styles.additional}>
        <span
          aria-label={`High temperature: ${highTemp} degrees, low temperature: ${lowTemp} degrees`}
        >
          <span className={styles.descriptor}>{getCurrentDay()}</span>{" "}
          <span className={styles.values}>
            {highTemp}° {lowTemp}°
          </span>
        </span>
        <span
          aria-label={`Air quality is ${airQualityDescription}, with an AQI of ${airQuality}`}
        >
          <span className={styles.descriptor}>Air quality:</span>{" "}
          <span
            className={styles.values}
          >{`${airQuality} - ${airQualityDescription}`}</span>
        </span>
      </div>
    </div>
  );
};

export default WeatherSummary;
