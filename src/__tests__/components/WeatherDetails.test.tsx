import { render, screen } from "@testing-library/react";
import WeatherDetails from "../../components/WeatherDetails";
import { WeatherDetailProps } from "../../components/WeatherDetail";

jest.mock(
  "../../components/WeatherDetail",
  () =>
    ({ label, value }: WeatherDetailProps) =>
      (
        <div>
          <span>{label}</span>
          <span>{value}</span>
        </div>
      )
);

describe("WeatherDetails", () => {
  const mockProps = {
    feelsLike: 70,
    windSpeed: 10,
    humidity: 60,
    pressure: 1015,
    visibility: 16093,
  };

  test("renders weather details heading", () => {
    render(<WeatherDetails {...mockProps} />);
    const heading = screen.getByText(/Weather Details/i);
    expect(heading).toBeInTheDocument();
  });

  test("displays the 'Feels Like' temperature", () => {
    render(<WeatherDetails {...mockProps} />);

    const feelsLikeElement = screen.getByText(/Feels Like/i);
    const valueElement = screen.getByText(/70°F/i);

    expect(feelsLikeElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("displays the wind speed", () => {
    render(<WeatherDetails {...mockProps} />);

    const windElement = screen.getByText(/ENE wind/i);
    const valueElement = screen.getByText(/10 mi\/h/i);

    expect(windElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("displays the humidity percentage", () => {
    render(<WeatherDetails {...mockProps} />);

    const humidityElement = screen.getByText(/Humidity/i);
    const valueElement = screen.getByText(/60%/i);

    expect(humidityElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("displays the visibility in miles", () => {
    render(<WeatherDetails {...mockProps} />);

    const visibilityElement = screen.getByText(/Visibility/i);
    const valueElement = screen.getByText(/10 miles/i);

    expect(visibilityElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("displays the pressure", () => {
    render(<WeatherDetails {...mockProps} />);

    const pressureElement = screen.getByText(/Pressure/i);
    const valueElement = screen.getByText(/1015 hPa/i);

    expect(pressureElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });
});
