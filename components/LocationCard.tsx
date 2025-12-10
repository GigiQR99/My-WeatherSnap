"use client";

import { CurrentWeather } from "@/types/weather";
import { convertTemperature, TemperatureUnit } from "@/lib/temperatureUtils";
import { getWeatherDescription, getWeatherIcon } from "@/lib/weatherCodes";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  locationName: string;
  country?: string;
  state?: string;
  weather: CurrentWeather;
  temperatureUnit: TemperatureUnit;
}

export default function LocationCard({
  locationName,
  country,
  state,
  weather,
  temperatureUnit,
}: LocationCardProps) {
  const weatherIcon = getWeatherIcon(weather.weatherCode);
  const weatherDesc = getWeatherDescription(weather.weatherCode);
  
  const locationDisplay = [locationName, state, country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-gray-300">
        <MapPin size={18} />
        <h3 className="text-lg font-medium">{locationDisplay}</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl font-bold">
              {Math.round(convertTemperature(weather.temperature, temperatureUnit))}°
            </span>
            <span className="text-2xl text-gray-400">{temperatureUnit}</span>
          </div>
          <p className="text-gray-300 text-lg">{weatherDesc}</p>
        </div>
        
        <div className="text-7xl">{weatherIcon}</div>
      </div>
    </div>
  );
}
