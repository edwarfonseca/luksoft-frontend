import { Link } from 'react-router-dom';
import CourseImage from '../courses/CourseImage';

/**
 * Tarjeta de post usada en el teaser de la home y en el listado /blog.
 * Si el post no tiene portada propia, reutiliza la ilustración con
 * degradado de CourseImage para mantener la misma identidad visual.
 */
export default function BlogCard({ post, color = 'primary' }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {post.coverImageUrl ? (
        <img src={post.coverImageUrl} alt={post.title} className="h-40 w-full object-cover" />
      ) : (
        <CourseImage icon="📰" color={color} className="h-40 w-full" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ink-900">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-600">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors duration-300 group-hover:text-primary-500"
        >
          Leer más
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
