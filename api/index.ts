/**
 * @file index.ts
 * @description Axios instance configuration for all external API integrations used in GhanaHub.
 * Each instance is pre-configured with a baseURL and shared parameters (e.g. API keys).
 * Import the appropriate instance in the relevant API module instead of using raw fetch/axios.
 */

import { create } from 'axios';

/**
 * Axios instance for the News API.
 * Automatically attaches the API key to every request via the `params` option.
 * @see https://newsapi.org
 */
export const newsApi = create({
    baseURL: 'https://newsapi.org/v1',
    params: {
        apiKey: process.env.NEWS_API_KEY,
    },
});

/**
 * Axios instance for the Community API (JSONPlaceholder).
 * Used for mock community data such as posts and users during development.
 * @see https://jsonplaceholder.typicode.com
 */
export const communityApi = create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

/**
 * Axios instance for the Open-Meteo Weather API.
 * Provides free weather forecast data without an API key.
 * @see https://open-meteo.com
 */
export const weatherApi = create({
    baseURL: 'https://api.open-meteo.com/v1',
});

/**
 * Axios instance for the REST Countries API.
 * Used to fetch country-level information such as flags, capitals, and currencies.
 * @see https://restcountries.com
 */
export const countriesApi = create({
    baseURL: 'https://restcountries.com/v3.1',
});
