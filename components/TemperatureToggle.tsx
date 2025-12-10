"use client";

interface TemperatureToggleProps {
  unit: "C" | "F";
  onToggle: (unit: "C" | "F") => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onToggle("C")}
        className={`px-4 py-2 rounded-full font-medium transition-all ${
          unit === "C"
            ? "bg-blue-500 text-white shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle("F")}
        className={`px-4 py-2 rounded-full font-medium transition-all ${
          unit === "F"
            ? "bg-blue-500 text-white shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        °F
      </button>
    </div>
  );
}
