"use client";

import { UnitSystem } from "@/types/weather";

interface UnitSystemToggleProps {
  unit: UnitSystem;
  onToggle: (unit: UnitSystem) => void;
}

export default function UnitSystemToggle({ unit, onToggle }: UnitSystemToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onToggle("metric")}
        className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
          unit === "metric"
            ? "bg-blue-500 text-white shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Metric (km/h)
      </button>
      <button
        onClick={() => onToggle("imperial")}
        className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
          unit === "imperial"
            ? "bg-blue-500 text-white shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Imperial (mph)
      </button>
    </div>
  );
}
