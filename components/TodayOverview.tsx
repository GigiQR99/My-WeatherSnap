"use client";

import { CurrentWeather, UnitSystem } from "@/types/weather";
import { convertTemperature, TemperatureUnit } from "@/lib/temperatureUtils";
import { convertWindSpeed, getWindSpeedUnit } from "@/lib/unitConversion";
import { Wind, Eye, Droplets, Thermometer, Sunrise, Sunset } from "lucide-react";

interface TodayOverviewProps {
  weather: CurrentWeather;
  sunrise: string;
  sunset: string;
  unit: TemperatureUnit;
  unitSystem: UnitSystem;
}

export default function TodayOverview({ weather, sunrise, sunset, unit, unitSystem }: TodayOverviewProps) {
  // Format time from ISO string
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    });
  };

  // Get wind direction
  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  // Get UV Index level
  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: "Low", color: "text-green-500" };
    if (uvIndex <= 5) return { level: "Moderate", color: "text-yellow-500" };
    if (uvIndex <= 7) return { level: "High", color: "text-orange-500" };
    if (uvIndex <= 10) return { level: "Very High", color: "text-red-500" };
    return { level: "Extreme", color: "text-purple-500" };
  };

  // Get visibility description
  const getVisibilityDescription = (visibility: number) => {
    const visibilityKm = visibility / 1000;
    if (visibilityKm >= 10) return "Clear visibility";
    if (visibilityKm >= 5) return "Moderate visibility";
    if (visibilityKm >= 2) return "Poor visibility";
    return "Very poor visibility";
  };

  const uvInfo = getUVLevel(weather.uvIndex);
  const visibilityKm = (weather.visibility / 1000).toFixed(1);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Today&apos;s Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Wind Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Wind Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {Math.round(convertWindSpeed(weather.windSpeed, unitSystem))}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">{getWindSpeedUnit(unitSystem)}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Direction: {getWindDirection(weather.windDirection)} ({Math.round(weather.windDirection)}°)
            </p>
          </div>
        </div>

        {/* UV Index */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-yellow-500 text-2xl">☀️</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">UV Index</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {weather.uvIndex.toFixed(1)}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">uv</span>
            </div>
            <p className={`font-medium ${uvInfo.color}`}>
              {uvInfo.level}
            </p>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Sunrise className="text-orange-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Sunrise & Sunset</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunrise className="text-orange-400" size={20} />
                <span className="text-gray-600 dark:text-gray-400">Sunrise</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatTime(sunrise)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunset className="text-indigo-500" size={20} />
                <span className="text-gray-600 dark:text-gray-400">Sunset</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatTime(sunset)}
              </span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Humidity</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {weather.humidity}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">%</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {weather.humidity >= 70 ? "High humidity" : weather.humidity >= 40 ? "Comfortable" : "Low humidity"}
            </p>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="text-purple-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Visibility</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {visibilityKm}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">km</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {getVisibilityDescription(weather.visibility)}
            </p>
          </div>
        </div>

        {/* Feels Like */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="text-red-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Feels Like</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {Math.round(convertTemperature(weather.apparentTemperature, unit))}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">°{unit}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {Math.abs(weather.apparentTemperature - weather.temperature) > 3
                ? "Feels different than actual"
                : "Similar to actual temperature"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
