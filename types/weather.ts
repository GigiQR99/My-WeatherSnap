export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  time: string;
  apparentTemperature: number;
  uvIndex: number;
  visibility: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitationSum: number;
}

export interface HourlyTemperature {
  time: string;
  temperature: number;
  weatherCode: number;
}

export type UnitSystem = "metric" | "imperial";

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyTemperature[];
  location: {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    state?: string;
  };
  todayOverview: {
    sunrise: string;
    sunset: string;
  };
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  feature_code?: string;
  population?: number;
}
