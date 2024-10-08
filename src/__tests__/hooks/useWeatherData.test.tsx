import { FormEvent } from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import useWeatherData from "../../hooks/useWeatherData";

global.fetch = jest.fn();

describe("useWeatherData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return initial state correctly", () => {
    const { result } = renderHook(() => useWeatherData());

    expect(result.current.city).toBe("");
    expect(result.current.weatherData).toBeNull();
    expect(result.current.error).toBe("");
  });

  test("should set city when fetchCityName is called", async () => {
    const mockCityNameResponse = [{ name: "New York" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCityNameResponse,
    });

    const { result } = renderHook(() => useWeatherData());

    await act(async () => {
      await result.current.setCity("New York");
    });

    expect(result.current.city).toBe("New York");
  });

  test("should handle form submission and fetch weather by city name", async () => {
    const mockWeatherResponse = {
      coord: { lat: 34.0522, lon: -118.2437 },
      weather: [{ description: "sunny" }],
      main: { temp: 85, temp_max: 90, temp_min: 80 },
    };

    const mockAirQualityResponse = { list: [{ main: { aqi: 2 } }] };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAirQualityResponse,
      });

    const { result } = renderHook(() => useWeatherData());

    act(() => {
      result.current.setCity("Los Angeles");
    });

    act(() => {
      result.current.handleSubmitForm({
        preventDefault: jest.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    await waitFor(() => {
      expect(result.current.weatherData).toEqual({
        ...mockWeatherResponse,
        airQuality: 2,
      });
    });
  });

  test("should return an error if city not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "City not found",
    });

    const { result } = renderHook(() => useWeatherData());

    act(() => {
      result.current.setCity("InvalidCity");
    });

    act(() => {
      result.current.handleSubmitForm({
        preventDefault: jest.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('City "InvalidCity" not found.');
    });
  });
});
