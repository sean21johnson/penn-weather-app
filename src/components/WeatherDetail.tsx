import { FC } from "react";
import styles from "../styles/WeatherDetail.module.css";

export interface WeatherDetailProps {
  label: string;
  value: string | number;
}

const WeatherDetail: FC<WeatherDetailProps> = ({ label, value }) => {
  return (
    <div className={styles.main} aria-label={`${label}: ${value}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default WeatherDetail;
