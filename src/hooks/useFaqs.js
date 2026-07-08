import useApiResource from './useApiResource';

export default function useFaqs() {
  const { items, isLoading, error } = useApiResource('/faqs');
  return { faqs: items, isLoading, error };
}
