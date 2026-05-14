/**
 * @file useFetch.ts
 * @description A reusable generic hook for fetching data from any async function.
 * Manages loading, error, and data states automatically, and exposes a refetch trigger.
 * Supports a dependencies array so the fetch re-runs when external values (e.g. a selected
 * city or search query) change — mirroring how useEffect's dependency array works.
 */

import { useState, useEffect, useCallback, useRef, DependencyList } from 'react';

/**
 * Custom React hook for fetching data from an API.
 * @template T - The expected shape of the resolved data.
 * @param fetchFunction - An async function that performs the API call and returns a Promise of T.
 * @param dependencies - Values the fetch depends on. Re-fetches whenever any of them change.
 * @returns An object containing the fetched data, loading state, error, and a refetch function.
 *
 * @example
 * // Re-fetches automatically when selectedCity changes
 * const { data, isLoading, error, refetch } = useFetch(
 *   () => fetchWeather(selectedCity),
 *   [selectedCity]
 * );
 */
function useFetch<T>(fetchFunction: () => Promise<T>, dependencies: DependencyList = []) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Kept in a ref so loadData always calls the latest fetchFunction without
    // needing it as a useCallback dependency (which would cause infinite re-fetches
    // when callers pass inline arrow functions like () => fetchWeather(city)).
    const fetchRef = useRef(fetchFunction);
    fetchRef.current = fetchFunction;

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchRef.current();

            if (result instanceof Response) {
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const json = await result.json();
                setData(json);
            } else {
                setData(result);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    // Passing a variable dependency list is intentional here — this mirrors how
    // useEffect's deps work and is the designed API of this hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, isLoading, error, refetch: loadData };
}

export default useFetch;
