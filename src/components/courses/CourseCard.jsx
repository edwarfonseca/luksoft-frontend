import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import CourseImage from './CourseImage';
import { getCourseTrialUrl } from '../../lib/courseTrial';

/**
 * Tarjeta de curso usada en la grilla de la sección "Cursos".
 * Recibe los datos del curso (ver useCourses) y enlaza a su página
 * de detalle para más información.
 */
export default function CourseCard({ course }) {
  const trialUrl = getCourseTrialUrl(course.slug);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {course.featured && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-secondary-500 px-3 py-1 text-xs font-semibold text-white shadow">
          ⭐ Destacado
        </span>
      )}
      {course.coverImageUrl ? (
        <img src={course.coverImageUrl} alt={course.title} className="h-40 w-full object-cover" />
      ) : (
        <CourseImage icon={course.icon} color={course.color} className="h-40 w-full" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ink-900">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-600">{course.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge icon="🎂" tone="primary">
            {course.ageRange}
          </Badge>
          <Badge icon="⏱️" tone="secondary">
            {course.duration}
          </Badge>
        </div>

        <Link
          to={`/cursos/${course.slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-500 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white"
        >
          Más Información
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

        {trialUrl && (
          <a
            href={trialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-secondary-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-secondary-600"
          >
            🧪 Laboratorio de Prueba
          </a>
        )}
      </div>
    </article>
  );
}
