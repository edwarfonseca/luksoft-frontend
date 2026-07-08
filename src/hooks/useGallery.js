import useApiResource from './useApiResource';

export default function useGallery() {
  const { items, isLoading, error } = useApiResource('/gallery');
  return { items, isLoading, error };
}
