import useApiResource from './useApiResource';

export default function useTestimonials() {
  const { items, isLoading, error } = useApiResource('/testimonials');
  return { testimonials: items, isLoading, error };
}
