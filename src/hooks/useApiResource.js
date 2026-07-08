import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient';
import { keysToCamel } from '../lib/caseConvert';

/**
 * Hook genérico para listas devueltas por el backend (`{ items, total }`).
 * Usado por todos los hooks públicos de recursos (useCourses, useFaqs, etc.)
 * para no repetir la lógica de fetch + loading + error en cada uno.
 */
export default function useApiResource(endpoint, { params } = {}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = params ? `?${new URLSearchParams(params)}` : '';

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    apiClient
      .get(`${endpoint}${query}`)
      .then((res) => setItems(keysToCamel(res.items ?? [])))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [endpoint, query]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { items, isLoading, error, refetch };
}
