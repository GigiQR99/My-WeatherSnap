"use client";

import { DailyForecast } from "@/types/weather";
import { getWeatherIcon } from "@/lib/weatherCodes";
import { convertTemperature, TemperatureUnit } from "@/lib/temperatureUtils";

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: TemperatureUnit;
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const date = new Date(forecast.date);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const weatherIcon = getWeatherIcon(forecast.weatherCode);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                    transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-1">{dayName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{monthDay}</p>
        
        <div className="text-6xl mb-4">{weatherIcon}</div>
        
        <div className="flex justify-center items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(convertTemperature(forecast.maxTemp, unit))}°
          </span>
          <span className="text-xl text-gray-400 dark:text-gray-500">
            {Math.round(convertTemperature(forecast.minTemp, unit))}°
          </span>
        </div>
        
        {forecast.precipitationSum > 0 && (
          <p className="text-sm text-blue-500 dark:text-blue-400">
            💧 {forecast.precipitationSum.toFixed(1)} mm
          </p>
        )}
      </div>
    </div>
  );
}
