"use client";

import { GeocodingResult } from "@/types/weather";
import { MapPin } from "lucide-react";

interface LocationResultsProps {
  results: GeocodingResult[];
  onSelect: (result: GeocodingResult) => void;
}

export default function LocationResults({ results, onSelect }: LocationResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 
                      dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Select a location:</h3>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {results.map((result, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(result)}
                className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 
                         dark:hover:bg-gray-700 transition-colors text-left"
              >
                <MapPin size={20} className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {result.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {[result.admin1, result.country].filter(Boolean).join(", ")}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
