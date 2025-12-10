import { WeatherData, GeocodingResult } from "@/types/weather";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function searchLocation(query: string): Promise<GeocodingResult[]> {
  const response = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to search location");
  }

  const data = await response.json();
  return data.results || [];
}

export async function getWeatherData(
  latitude: number,
  longitude: number,
  locationName: string,
  country?: string,
  state?: string
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index,visibility",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset",
    timezone: "auto",
    forecast_days: "8",
    forecast_hours: "24",
  });

  const response = await fetch(`${WEATHER_API}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      humidity: data.current.relative_humidity_2m,
      time: data.current.time,
      apparentTemperature: data.current.apparent_temperature,
      uvIndex: data.current.uv_index,
      visibility: data.current.visibility,
    },
    daily: data.daily.time.slice(1, 8).map((date: string, index: number) => ({
      date,
      maxTemp: data.daily.temperature_2m_max[index + 1],
      minTemp: data.daily.temperature_2m_min[index + 1],
      weatherCode: data.daily.weather_code[index + 1],
      precipitationSum: data.daily.precipitation_sum[index + 1],
    })),
    hourly: data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weather_code[index],
    })),
    location: {
      name: locationName,
      latitude,
      longitude,
      country,
      state,
    },
    todayOverview: {
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
    },
  };
}
