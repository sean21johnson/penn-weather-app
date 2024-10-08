import { render, screen } from "@testing-library/react";
import App from "../../App";

jest.mock("../../components/WeatherDashboard", () => () => (
  <div>WeatherDashboard Component</div>
));

describe("App", () => {
  test("renders the WeatherDashboard component", () => {
    render(<App />);

    const weatherDashboardElement = screen.getByText(
      /WeatherDashboard Component/i
    );
    expect(weatherDashboardElement).toBeInTheDocument();
  });
});
