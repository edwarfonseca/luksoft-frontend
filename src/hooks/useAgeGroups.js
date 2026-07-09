import useApiResource from './useApiResource';

export default function useAgeGroups() {
  const { items, isLoading, error } = useApiResource('/age-groups');
  return { ageGroups: items, isLoading, error };
}
