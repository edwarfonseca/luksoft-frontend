import useApiResource from './useApiResource';

export default function useMethodologySteps() {
  const { items, isLoading, error } = useApiResource('/methodology');
  return { steps: items, isLoading, error };
}
