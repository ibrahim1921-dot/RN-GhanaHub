/**
 * @file newsApi.ts
 * @description API functions for fetching news content relevant to Ghana.
 * All requests are made through the shared `newsApi` Axios instance defined in `index.ts`,
 * which automatically injects the required API key.
 */

import { newsApi } from ".";

/**
 * Fetches the top general news headlines for Ghana.
 * Filters results by country code `gh` and category `general`.
 * @returns A promise resolving to a list of top headline articles.
 */
export function fetchTopHeadlines() {
    return newsApi.get('/top-headlines', {
        params: {
            country: 'gh',
            category: 'general',
        },
    });
}

/**
 * Searches for news articles matching a given query string.
 * @param query - The keyword or phrase to search for.
 * @returns A promise resolving to a list of matching news articles.
 */
export function searchNews(query: string) {
    return newsApi.get('/everything', {
        params: {
            q: query,
        },
    });
}
