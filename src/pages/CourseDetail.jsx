import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import SectionLoading from '../components/common/SectionLoading';
import CourseImage from '../components/courses/CourseImage';
import { useCourseBySlug } from '../hooks/useCourses';
import { getCourseTrialUrl } from '../lib/courseTrial';

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

  const trialUrl = getCourseTrialUrl(course.slug);

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
              {!!course.totalSessions && (
                <Badge icon="🗓️" tone="neutral">
                  {course.totalSessions} clases
                </Badge>
              )}
              {!!course.sessionLength && (
                <Badge icon="⏳" tone="neutral">
                  {course.sessionLength} por clase
                </Badge>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={handleEnroll}>
                Inscribirme en este curso
              </Button>
              {trialUrl && (
                <Button as="a" href={trialUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                  🧪 Prueba una clase gratis
                </Button>
              )}
            </div>
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

      {course.syllabus?.length > 0 && (
        <section className="bg-ink-50 py-16">
          <Container>
            <h2 className="text-xl font-semibold text-ink-900">Plan de estudio</h2>
            <p className="mt-2 text-sm text-ink-600">
              Un recorrido paso a paso, unidad por unidad, para que el aprendizaje avance con sentido.
            </p>
            <ol className="mt-8 space-y-4">
              {course.syllabus.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm text-ink-700">{item}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {(course.badges?.length > 0 || !!course.totalXp) && (
        <section className="bg-white py-16">
          <Container>
            <h2 className="text-xl font-semibold text-ink-900">Insignias que desbloqueará</h2>
            <p className="mt-2 text-sm text-ink-600">
              Cada logro se celebra con una insignia y puntos de experiencia (XP), manteniendo la motivación alta
              de principio a fin.
              {!!course.totalXp && (
                <>
                  {' '}
                  En total, puede acumular <span className="font-semibold text-primary-600">+{course.totalXp} XP</span>.
                </>
              )}
            </p>
            {course.badges?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {course.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-2xl bg-secondary-400/15 px-4 py-2 text-sm font-medium text-secondary-700"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </article>
  );
}
