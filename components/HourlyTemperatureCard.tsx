"use client";

import { HourlyTemperature } from "@/types/weather";
import { convertTemperature, TemperatureUnit } from "@/lib/temperatureUtils";

interface HourlyTemperatureCardProps {
  hourlyData: HourlyTemperature[];
  temperatureUnit: TemperatureUnit;
}

export default function HourlyTemperatureCard({
  hourlyData,
  temperatureUnit,
}: HourlyTemperatureCardProps) {
  // Get temperatures for morning (6am), afternoon (12pm), evening (6pm), night (12am)
  const getTimeSlot = (hour: number) => {
    const timeSlots = [
      { label: "Morning", hour: 6, data: hourlyData[6] },
      { label: "Afternoon", hour: 12, data: hourlyData[12] },
      { label: "Evening", hour: 18, data: hourlyData[18] },
      { label: "Night", hour: 0, data: hourlyData[0] },
    ];
    return timeSlots;
  };

  const timeSlots = getTimeSlot(0);
  
  // Calculate min and max for the chart
  const temps = timeSlots.map(slot => slot.data?.temperature || 0);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Temperature
      </h3>
      
      {/* Temperature Chart */}
      <div className="relative h-32 mb-6">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" strokeDasharray="4" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-600" />
          
          {/* Temperature line */}
          <polyline
            points={timeSlots
              .map((slot, index) => {
                const x = (index * 400) / 3;
                const temp = slot.data?.temperature || 0;
                const y = 100 - ((temp - minTemp) / range) * 80 - 10;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Temperature points */}
          {timeSlots.map((slot, index) => {
            const x = (index * 400) / 3;
            const temp = slot.data?.temperature || 0;
            const y = 100 - ((temp - minTemp) / range) * 80 - 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#f59e0b"
                className="drop-shadow-md"
              />
            );
          })}
        </svg>
      </div>
      
      {/* Time labels and temperatures */}
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((slot, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {slot.label}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {slot.data
                ? `${Math.round(convertTemperature(slot.data.temperature, temperatureUnit))}°`
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
