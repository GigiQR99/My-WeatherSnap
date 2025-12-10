"use client";

import { CurrentWeather as CurrentWeatherType, UnitSystem } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/lib/weatherCodes";
import { convertTemperature, TemperatureUnit } from "@/lib/temperatureUtils";
import { convertWindSpeed, getWindSpeedUnit } from "@/lib/unitConversion";
import { Wind, Droplets } from "lucide-react";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  locationName: string;
  unit: TemperatureUnit;
  unitSystem: UnitSystem;
}

export default function CurrentWeather({ weather, locationName, unit, unitSystem }: CurrentWeatherProps) {
  const weatherIcon = getWeatherIcon(weather.weatherCode);
  const weatherDesc = getWeatherDescription(weather.weatherCode);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{locationName}</h2>
          <p className="text-blue-100 text-lg mb-4">{weatherDesc}</p>
          
          <div className="flex items-baseline gap-2">
            <span className="text-7xl md:text-8xl font-bold">
              {Math.round(convertTemperature(weather.temperature, unit))}°
            </span>
            <span className="text-3xl text-blue-100">{unit}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-8xl md:text-9xl">{weatherIcon}</div>
          
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Wind size={18} />
              <span>{Math.round(convertWindSpeed(weather.windSpeed, unitSystem))} {getWindSpeedUnit(unitSystem)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Droplets size={18} />
              <span>{weather.humidity}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
