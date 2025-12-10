# Weather Dashboard

A modern, responsive weather dashboard built with Next.js, React, TypeScript, and Tailwind CSS. Get current weather conditions and a 7-day forecast for any city worldwide.

## Features

- 🌤️ **Current Weather**: Real-time temperature, weather conditions, wind speed, and humidity
- 📅 **7-Day Forecast**: Daily weather predictions with high/low temperatures
- 📊 **Today's Overview**: Detailed widgets showing wind status, UV index, sunrise/sunset, humidity, visibility, and feels-like temperature
- 🤖 **AI Weather Assistant**: Chat with an AI-powered weather assistant for advice and explanations
- 🌡️ **Temperature Units**: Toggle between Celsius and Fahrenheit
- 🔍 **City Search**: Search for any city worldwide with autocomplete suggestions
- 📱 **Responsive Design**: Beautiful UI that works on mobile, tablet, and desktop
- 🌓 **Dark Mode Support**: Automatic dark mode based on system preferences
- 🆓 **No Weather API Key Required**: Uses the free Open-Meteo API

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Open-Meteo (free weather API)

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, or pnpm package manager
- OpenAI API key (for chatbot feature) - Get one at https://platform.openai.com/api-keys

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up your OpenAI API key:

Create a `.env` file in the project root and add your API key:
```bash
OPENAI_API_KEY=your_api_key_here
```

**See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed security guidelines.**

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Choose your preferred temperature unit (Celsius or Fahrenheit) using the toggle
2. Enter a city name in the search bar
3. Select from the location suggestions if multiple results appear
4. View the current weather and 7-day forecast
5. Explore Today's Overview section for detailed weather metrics
6. Click the chat button (bottom-right) to ask the AI weather assistant questions
7. Toggle between temperature units at any time
8. Search for different cities to compare weather conditions

## Project Structure

```
weather-dashboard/
├── app/
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main page with weather dashboard
├── components/
│   ├── SearchBar.tsx     # City search input component
│   ├── CurrentWeather.tsx # Current weather display
│   ├── ForecastCard.tsx  # Individual forecast day card
│   ├── LocationResults.tsx # Location selection dropdown
│   ├── TemperatureToggle.tsx # Temperature unit toggle
│   └── TodayOverview.tsx # Today's detailed weather widgets
├── lib/
│   ├── weatherApi.ts     # API functions for weather data
│   ├── weatherCodes.ts   # Weather code mappings
│   └── temperatureUtils.ts # Temperature conversion utilities
├── types/
│   └── weather.ts        # TypeScript type definitions
└── package.json          # Project dependencies
```

## API Information

This project uses the [Open-Meteo API](https://open-meteo.com/), which provides:
- Free weather data with no API key required
- Current weather conditions
- Daily forecasts
- Geocoding for city search

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for personal or commercial purposes.
