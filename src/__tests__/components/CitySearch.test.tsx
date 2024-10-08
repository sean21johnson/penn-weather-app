import { render, screen, fireEvent } from "@testing-library/react";
import CitySearch from "../../components/CitySearch";

const mockProps = {
  city: "",
  setCity: jest.fn(),
  onSubmitForm: jest.fn(),
  onClickGeolocation: jest.fn(),
};

describe("CitySearch Component", () => {
  test("renders input, geolocation button, and submit button", () => {
    render(<CitySearch {...mockProps} />);

    const inputElement = screen.getByPlaceholderText(/Enter city/i);
    const getWeatherButtonElement = screen.getByRole("button", {
      name: /Get Weather/i,
    });
    const geoButtonElement = screen.getByRole("button", {
      name: /Use Geolocation/i,
    });

    expect(inputElement).toBeInTheDocument();
    expect(getWeatherButtonElement).toBeInTheDocument();
    expect(geoButtonElement).toBeInTheDocument();
  });

  test("input value is controlled by city prop", () => {
    render(<CitySearch {...mockProps} city="New York" />);

    const inputElement = screen.getByDisplayValue("New York");

    expect(inputElement).toBeInTheDocument();
  });

  test("calls setCity when input value changes", () => {
    render(<CitySearch {...mockProps} />);

    const inputElement = screen.getByPlaceholderText(/Enter city/i);
    fireEvent.change(inputElement, { target: { value: "Los Angeles" } });

    expect(mockProps.setCity).toHaveBeenCalledWith("Los Angeles");
  });

  test("disables the submit button when input is empty", () => {
    render(<CitySearch {...mockProps} />);

    const weatherButton = screen.getByRole("button", {
      name: /Get Weather/i,
    });
    expect(weatherButton).toBeDisabled();
  });

  test("enables the submit button when input has a value", () => {
    render(<CitySearch {...mockProps} city="Miami" />);

    const weatherButton = screen.getByRole("button", {
      name: /Get Weather/i,
    });
    expect(weatherButton).not.toBeDisabled();
  });

  test("calls onSubmitForm on form submission", () => {
    render(<CitySearch {...mockProps} city="Chicago" />);

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockProps.onSubmitForm).toHaveBeenCalled();
  });

  test("calls onClickGeolocation when geolocation button is clicked", () => {
    render(<CitySearch {...mockProps} />);

    const geolocationButton = screen.getByRole("button", {
      name: /Use Geolocation/i,
    });
    fireEvent.click(geolocationButton);

    expect(mockProps.onClickGeolocation).toHaveBeenCalled();
  });
});
