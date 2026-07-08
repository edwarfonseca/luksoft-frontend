import useApiResource from './useApiResource';
import useApiItem from './useApiItem';

export default function useBlogPosts(params) {
  const { items, isLoading, error } = useApiResource('/blog', { params });
  return { posts: items, isLoading, error };
}

export function useBlogPostBySlug(slug) {
  const { item, isLoading, error } = useApiItem(slug ? `/blog/${slug}` : null);
  return { post: item, isLoading, error };
}
