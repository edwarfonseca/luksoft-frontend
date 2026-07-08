import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient';
import { keysToCamel } from '../lib/caseConvert';

/** Igual que useApiResource pero para un único recurso (ej. GET /courses/:slug). */
export default function useApiItem(endpoint) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    if (!endpoint) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    apiClient
      .get(endpoint)
      .then((res) => setItem(keysToCamel(res)))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [endpoint]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { item, isLoading, error, refetch };
}
