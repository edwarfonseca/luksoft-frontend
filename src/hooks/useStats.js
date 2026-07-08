import useApiResource from './useApiResource';

export default function useStats() {
  const { items, isLoading, error } = useApiResource('/stats');
  return { stats: items, isLoading, error };
}
