import { render, screen, fireEvent } from "@testing-library/react";
import WeatherDashboard from "../../components/WeatherDashboard";
import useWeatherData from "../../hooks/useWeatherData";

// Mock the useWeatherData hook
jest.mock("../../hooks/useWeatherData");

describe("WeatherDashboard Component", () => {
  // Updated mockUseWeatherData with proper typing for weatherData
  const mockUseWeatherData: {
    city: string;
    setCity: jest.Mock<any, any>;
    weatherData: null | {
      airQuality: number;
      weather: { description: string }[];
      main: {
        temp_max: number;
        temp_min: number;
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
      };
      visibility: number;
      wind: { speed: number };
    };
    error: string;
    handleSubmitForm: jest.Mock<any, any>;
    handleClickGeolocation: jest.Mock<any, any>;
  } = {
    city: "New York",
    setCity: jest.fn(),
    weatherData: null, // Start with null but allow it to be assigned a valid object later
    error: "",
    handleSubmitForm: jest.fn(),
    handleClickGeolocation: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWeatherData as jest.Mock).mockReturnValue(mockUseWeatherData);
  });

  test("renders the CitySearch component", () => {
    render(<WeatherDashboard />);

    const citySearchInput = screen.getByPlaceholderText("Enter city");
    expect(citySearchInput).toBeInTheDocument();

    const geolocationButton = screen.getByRole("button", {
      name: /Use Geolocation/i,
    });
    expect(geolocationButton).toBeInTheDocument();
  });

  test("calls handleSubmitForm when the form is submitted", () => {
    render(<WeatherDashboard />);

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockUseWeatherData.handleSubmitForm).toHaveBeenCalled();
  });

  test("calls handleClickGeolocation when 'Use Geolocation' button is clicked", () => {
    render(<WeatherDashboard />);

    const geolocationButton = screen.getByRole("button", {
      name: /Use Geolocation/i,
    });
    fireEvent.click(geolocationButton);

    expect(mockUseWeatherData.handleClickGeolocation).toHaveBeenCalled();
  });

  test("displays an error message when error exists", () => {
    mockUseWeatherData.error = "City not found";
    (useWeatherData as jest.Mock).mockReturnValue(mockUseWeatherData);

    render(<WeatherDashboard />);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("City not found");
  });

  test("renders WeatherSummary and WeatherDetails when weatherData is available", () => {
    const weatherData = {
      airQuality: 50,
      weather: [{ description: "Clear sky" }],
      main: {
        temp_max: 80,
        temp_min: 65,
        temp: 75,
        feels_like: 73,
        humidity: 60,
        pressure: 1015,
      },
      visibility: 10000,
      wind: { speed: 10 },
    };

    mockUseWeatherData.weatherData = weatherData;
    (useWeatherData as jest.Mock).mockReturnValue(mockUseWeatherData);

    render(<WeatherDashboard />);

    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByText("75°")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
  });
});
