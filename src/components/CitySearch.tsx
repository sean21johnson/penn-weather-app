import { FC, FormEvent } from "react";
import styles from "../styles/CitySearch.module.css";

interface CitySearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  onClickGeolocation: () => void;
}

const CitySearch: FC<CitySearchFormProps> = ({
  city,
  setCity,
  onSubmitForm,
  onClickGeolocation,
}) => {
  return (
    <div className={styles.main}>
      <button onClick={onClickGeolocation} className={styles.geoButton}>
        Use Geolocation
      </button>
      <form onSubmit={onSubmitForm} className={styles.form} role="form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
        />
        <button
          disabled={!city.length}
          type="submit"
          className={styles.weatherButton}
        >
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default CitySearch;
