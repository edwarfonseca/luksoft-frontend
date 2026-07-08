import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import SectionLoading from '../components/common/SectionLoading';
import CourseImage from '../components/courses/CourseImage';
import { useCourseBySlug } from '../hooks/useCourses';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { course, isLoading } = useCourseBySlug(slug);

  if (isLoading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center pt-32">
        <SectionLoading label="Cargando curso..." />
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
        <span className="text-5xl" aria-hidden="true">
          🔍
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">Curso no encontrado</h1>
        <p className="mt-2 text-ink-600">El curso que buscas no existe o fue movido.</p>
        <Link to="/" className="mt-6 font-semibold text-primary-600 hover:underline">
          Volver al inicio
        </Link>
      </Container>
    );
  }

  const handleEnroll = () => {
    navigate('/', { state: { scrollTo: 'contacto', selectedCourse: course.slug } });
  };

  return (
    <article className="pt-24">
      <section className="bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {course.coverImageUrl ? (
            <img
              src={course.coverImageUrl}
              alt={course.title}
              className="h-56 w-full rounded-3xl object-cover shadow-xl"
            />
          ) : (
            <CourseImage icon={course.icon} color={course.color} className="h-56 w-full rounded-3xl shadow-xl" />
          )}

          <div className="text-white">
            <Link to="/" className="text-sm font-medium text-white/80 hover:text-white">
              ← Volver a todos los cursos
            </Link>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.title}</h1>
            <p className="mt-4 text-white/90">{course.longDescription}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge icon="🎂" tone="primary">
                {course.ageRange}
              </Badge>
              <Badge icon="⏱️" tone="secondary">
                {course.duration}
              </Badge>
              <Badge icon="📈" tone="neutral">
                Nivel {course.level}
              </Badge>
            </div>

            <Button variant="primary" size="lg" className="mt-8" onClick={handleEnroll}>
              Inscribirme en este curso
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">Lo que tu hijo o hija aprenderá</h2>
            <ul className="mt-5 space-y-3">
              {course.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 text-primary-500" aria-hidden="true">
                    ✔
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink-900">Proyectos que construirá</h2>
            <ul className="mt-5 space-y-3">
              {course.projects.map((project) => (
                <li
                  key={project}
                  className="rounded-xl bg-ink-50 px-4 py-3 text-sm font-medium text-ink-700"
                >
                  {project}
                </li>
              ))}
            </ul>

            <Button variant="outline" size="md" className="mt-8" onClick={handleEnroll}>
              Quiero más información
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
