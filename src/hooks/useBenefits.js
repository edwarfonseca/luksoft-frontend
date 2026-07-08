import useApiResource from './useApiResource';

export default function useBenefits() {
  const { items, isLoading, error } = useApiResource('/benefits');
  return { benefits: items, isLoading, error };
}
