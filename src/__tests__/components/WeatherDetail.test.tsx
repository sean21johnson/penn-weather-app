import { render, screen } from "@testing-library/react";
import WeatherDetail from "../../components/WeatherDetail";

const mockProps = {
  label: "Temperature",
  value: "72°F",
};

const mockNumericProps = { label: "Pressure", value: 1015 };

describe("WeatherDetail", () => {
  test("renders label and value", () => {
    render(<WeatherDetail {...mockProps} />);

    const labelElement = screen.getByText(/Temperature/i);
    const valueElement = screen.getByText(/72°F/i);

    expect(labelElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("sets correct aria-label for accessibility", () => {
    render(<WeatherDetail {...mockProps} />);

    const ariaLabelElement = screen.getByLabelText(/Temperature: 72°F/i);
    expect(ariaLabelElement).toBeInTheDocument();
  });

  test("displays numerical value correctly", () => {
    render(<WeatherDetail {...mockNumericProps} />);

    const valueElement = screen.getByText(/1015/i);
    expect(valueElement).toBeInTheDocument();
  });

  test("displays correct aria-label for numerical value", () => {
    render(<WeatherDetail {...mockNumericProps} />);

    const ariaLabelElement = screen.getByLabelText(/Pressure: 1015/i);
    expect(ariaLabelElement).toBeInTheDocument();
  });
});
