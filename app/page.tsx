"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCard from "@/components/ForecastCard";
import LocationResults from "@/components/LocationResults";
import TemperatureToggle from "@/components/TemperatureToggle";
import UnitSystemToggle from "@/components/UnitSystemToggle";
import TodayOverview from "@/components/TodayOverview";
import LocationCard from "@/components/LocationCard";
import HourlyTemperatureCard from "@/components/HourlyTemperatureCard";
import CityImageCard from "@/components/CityImageCard";
import Chatbot from "@/components/Chatbot";
import { searchLocation, getWeatherData } from "@/lib/weatherApi";
import { WeatherData, GeocodingResult, UnitSystem } from "@/types/weather";
import { TemperatureUnit } from "@/lib/temperatureUtils";
import { Cloud, Loader2, MapPin } from "lucide-react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationResults, setLocationResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [isGeolocating, setIsGeolocating] = useState(false);

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsGeolocating(true);
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode using Nominatim (OpenStreetMap)
          const geocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'WeatherDashboard/1.0'
              }
            }
          );
          const geocodeData = await geocodeResponse.json();
          
          if (geocodeData && geocodeData.address) {
            const address = geocodeData.address;
            const cityName = address.city || address.town || address.village || address.county || "Unknown Location";
            const state = address.state || address.region || "";
            const country = address.country || "";
            
            const data = await getWeatherData(
              latitude,
              longitude,
              cityName,
              country,
              state
            );
            setWeatherData(data);
          } else {
            setError("Could not determine your location. Please search manually.");
          }
        } catch (err) {
          console.error("Geolocation error:", err);
          setError("Failed to get your location. Please try searching manually.");
        } finally {
          setIsGeolocating(false);
        }
      },
      (error) => {
        console.error("Geolocation denied:", error);
        let errorMessage = "Location access denied. ";
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage += "Please enable location permissions in your browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage += "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage += "Location request timed out.";
        }
        
        setError(errorMessage);
        setIsGeolocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setLocationResults([]);

    try {
      const results = await searchLocation(query);
      if (results.length === 0) {
        setError("No locations found. Please try a different search.");
      } else if (results.length === 1) {
        // Auto-select if only one result
        await handleLocationSelect(results[0]);
      } else {
        setLocationResults(results);
      }
    } catch (err) {
      setError("Failed to search for location. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (location: GeocodingResult) => {
    setIsLoading(true);
    setError(null);
    setLocationResults([]);

    try {
      const data = await getWeatherData(
        location.latitude,
        location.longitude,
        location.name,
        location.country,
        location.admin1
      );
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
                    dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud size={48} className="text-blue-500" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              WeatherSnap
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Get current weather and 7-day forecast for any city
          </p>
        </div>

        {/* Toggles and Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center gap-4 flex-wrap">
            <TemperatureToggle unit={temperatureUnit} onToggle={setTemperatureUnit} />
            <UnitSystemToggle unit={unitSystem} onToggle={setUnitSystem} />
            {!weatherData && (
              <button
                onClick={handleGeolocation}
                disabled={isGeolocating}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 
                         text-white rounded-full font-medium transition-all shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MapPin size={18} />
                {isGeolocating ? "Locating..." : "Use My Location"}
              </button>
            )}
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading || isGeolocating} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 
                          dark:border-red-800 rounded-2xl p-6 text-center">
              <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Location Results */}
        {locationResults.length > 0 && (
          <LocationResults
            results={locationResults}
            onSelect={handleLocationSelect}
          />
        )}

        {/* Weather Data with Sidebar */}
        {weatherData && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Weather */}
              <CurrentWeather
                weather={weatherData.current}
                locationName={weatherData.location.name}
                unit={temperatureUnit}
                unitSystem={unitSystem}
              />

              {/* 7-Day Forecast */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  7-Day Forecast
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                  {weatherData.daily.map((forecast, index) => (
                    <ForecastCard key={index} forecast={forecast} unit={temperatureUnit} />
                  ))}
                </div>
              </div>

              {/* Today's Overview */}
              <TodayOverview
                weather={weatherData.current}
                sunrise={weatherData.todayOverview.sunrise}
                sunset={weatherData.todayOverview.sunset}
                unit={temperatureUnit}
                unitSystem={unitSystem}
              />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Location Card */}
              <LocationCard
                locationName={weatherData.location.name}
                country={weatherData.location.country}
                state={weatherData.location.state}
                weather={weatherData.current}
                temperatureUnit={temperatureUnit}
              />

              {/* Hourly Temperature Card */}
              <HourlyTemperatureCard
                hourlyData={weatherData.hourly}
                temperatureUnit={temperatureUnit}
              />

              {/* City Image Card */}
              <CityImageCard 
                key={`${weatherData.location.name}-${weatherData.location.country}`} 
                cityName={weatherData.location.name} 
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weatherData && !isLoading && !error && locationResults.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🌤️</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Search for a city to get started
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a city name to view current weather and forecast
            </p>
          </div>
        )}
      </div>

      {/* Chatbot */}
      <Chatbot />
    </main>
  );
}
