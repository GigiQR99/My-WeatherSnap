"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-2 border-gray-200 
                   focus:border-blue-500 focus:outline-none transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-500 
                   text-white rounded-xl hover:bg-blue-600 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
