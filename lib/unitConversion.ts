import { UnitSystem } from "@/types/weather";

export function convertWindSpeed(kmh: number, unit: UnitSystem): number {
  if (unit === "imperial") {
    return kmh * 0.621371; // Convert km/h to mph
  }
  return kmh;
}

export function getWindSpeedUnit(unit: UnitSystem): string {
  return unit === "imperial" ? "mph" : "km/h";
}
