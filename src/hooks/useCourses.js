import useApiResource from './useApiResource';
import useApiItem from './useApiItem';

export default function useCourses() {
  const { items, isLoading, error } = useApiResource('/courses');
  return { courses: items, isLoading, error };
}

export function useCourseBySlug(slug) {
  const { item, isLoading, error } = useApiItem(slug ? `/courses/${slug}` : null);
  return { course: item, isLoading, error };
}
