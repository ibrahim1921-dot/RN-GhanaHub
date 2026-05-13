/**
 * @file weatherApi.ts
 * @description API functions for fetching real-time weather data.
 * Uses the Open-Meteo API which requires no authentication.
 * @see https://open-meteo.com
 */

/**
 * Fetches the current weather conditions for a given city.
 * Currently hardcoded to Accra, Ghana (latitude: 5.6037, longitude: -0.1870).
 * @param city - The name of the city (reserved for future dynamic coordinate lookup).
 * @returns A promise resolving to the fetch Response containing current weather data.
 */
export function fetchWeather(city: string) {
    return fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=5.6037&longitude=-0.1870&current_weather=true`
    );
}
