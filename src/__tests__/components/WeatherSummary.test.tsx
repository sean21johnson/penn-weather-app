import { render, screen } from "@testing-library/react";
import WeatherSummary from "../../components/WeatherSummary";

const mockProps = {
  name: "Dallas",
  temp: 72,
  description: "clear sky",
  highTemp: 74,
  lowTemp: 68,
  airQuality: "50",
};

describe("WeatherSummary Component", () => {
  test("renders city name", () => {
    render(<WeatherSummary {...mockProps} />);

    const cityNameElement = screen.getByText(/Dallas/i);

    expect(cityNameElement).toBeInTheDocument();
  });

  test("renders temperature and description", () => {
    render(<WeatherSummary {...mockProps} />);

    const tempElement = screen.getByText(/72°/i);
    const descriptionElement = screen.getByText(/clear sky/i);

    expect(tempElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders high and low temperatures", () => {
    render(<WeatherSummary {...mockProps} />);

    const highLowElement = screen.getByText(/74° 68°/i);

    expect(highLowElement).toBeInTheDocument();
  });

  test("renders air quality information", () => {
    render(<WeatherSummary {...mockProps} />);

    const airQualityElement = screen.getByText(/50 - Good/i);

    expect(airQualityElement).toBeInTheDocument();
  });

  test("renders current day", () => {
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });
    render(<WeatherSummary {...mockProps} />);

    const currentDayElement = screen.getByText(new RegExp(currentDay, "i"));
    expect(currentDayElement).toBeInTheDocument();
  });

  test("has aria-labels for accessibility", () => {
    render(<WeatherSummary {...mockProps} />);

    const tempWrapper = screen.getByLabelText(
      /current temperature: 72 degrees and clear sky/i
    );
    const highLowWrapper = screen.getByLabelText(
      /high temperature: 74 degrees, low temperature: 68 degrees/i
    );
    const airQualityWrapper = screen.getByLabelText(
      /air quality is good, with an aqi of 50/i
    );

    expect(tempWrapper).toBeInTheDocument();
    expect(highLowWrapper).toBeInTheDocument();
    expect(airQualityWrapper).toBeInTheDocument();
  });
});
