import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import Reveal from '../common/Reveal';
import CourseCard from '../courses/CourseCard';
import useCourses from '../../hooks/useCourses';
import useSettings from '../../hooks/useSettings';

export default function Courses() {
  const { courses, isLoading } = useCourses();
  const { settings } = useSettings();
  const section = settings.section?.courses ?? {};

  return (
    <section id="cursos" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Nuestros Cursos'}
          title={section.title || 'Programas pensados para cada edad e interés'}
          subtitle={
            section.subtitle ||
            'Desde los primeros bloques de Scratch hasta inteligencia artificial: un curso para cada etapa del camino tecnológico de tu hijo o hija.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando cursos..." />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course, index) => (
              <Reveal key={course.id} delay={index * 60}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
