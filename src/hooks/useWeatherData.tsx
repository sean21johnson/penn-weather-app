import { useState, useRef, useEffect, FormEvent } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const useWeatherData = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  const fetchCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      if (!response.ok) throw new Error("Unable to fetch city name");

      const data = await response.json();
      if (data.length > 0) setCity(data[0].name);
    } catch (err) {
      console.error("Error fetching city name:", err);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      );
      if (!response.ok) throw new Error("Unable to fetch weather data");

      const data = await response.json();
      const airQuality = await fetchAirQuality(lat, lon);
      setWeatherData({ ...data, airQuality });
    } catch (err: any) {
      const updatedErrorMessage = replaceErrorMessage(err.message, city);
      setError(updatedErrorMessage);
    }
  };

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      const airQuality = await fetchAirQuality(data.coord.lat, data.coord.lon);
      setWeatherData({ ...data, airQuality });
    } catch (err: any) {
      const updatedErrorMessage = replaceErrorMessage(err.message, city);
      setError(updatedErrorMessage);
    }
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (!response.ok) throw new Error("Air quality not found");

      const data = await response.json();
      return data.list[0].main.aqi;
    } catch (err) {
      return "Unknown";
    }
  };

  const replaceErrorMessage = (error: string, city: string) => {
    if (error === "City not found") return `City "${city}" not found.`;
    return error;
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    debounceTimeoutRef.current = window.setTimeout(() => {
      setError("");
      setWeatherData(null);
      fetchWeather(city);
    }, 300);
  };

  const handleClickGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
          fetchCityName(latitude, longitude);
          setError("");
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return {
    city,
    error,
    handleClickGeolocation,
    handleSubmitForm,
    setCity,
    weatherData,
  };
};

export default useWeatherData;
