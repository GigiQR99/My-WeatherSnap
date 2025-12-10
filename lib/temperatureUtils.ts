export type TemperatureUnit = "C" | "F";

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function convertTemperature(
  temperature: number,
  unit: TemperatureUnit
): number {
  if (unit === "F") {
    return celsiusToFahrenheit(temperature);
  }
  return temperature;
}

export function formatTemperature(
  temperature: number,
  unit: TemperatureUnit
): string {
  const converted = convertTemperature(temperature, unit);
  return `${Math.round(converted)}°${unit}`;
}
