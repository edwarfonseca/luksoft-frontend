import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { keysToCamel, keysToSnake } from '../../lib/caseConvert';

const PAGE_SIZE = 10;

/** CRUD genérico contra un endpoint del backend, usado por ResourceCrudPage. */
export default function useCrudResource(endpoint) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = useCallback(() => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    if (search) params.set('search', search);

    return apiClient
      .get(`${endpoint}?${params}`)
      .then((res) => {
        setItems(keysToCamel(res.items));
        setTotal(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [endpoint, page, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const create = useCallback((data) => apiClient.post(endpoint, keysToSnake(data)).then(fetchItems), [endpoint, fetchItems]);
  const update = useCallback(
    (id, data) => apiClient.put(`${endpoint}/${id}`, keysToSnake(data)).then(fetchItems),
    [endpoint, fetchItems],
  );
  const remove = useCallback((id) => apiClient.del(`${endpoint}/${id}`).then(fetchItems), [endpoint, fetchItems]);

  return {
    items,
    total,
    page,
    setPage,
    pageSize: PAGE_SIZE,
    search,
    setSearch: handleSearchChange,
    isLoading,
    create,
    update,
    remove,
  };
}
