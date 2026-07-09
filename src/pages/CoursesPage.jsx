import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import SectionLoading from '../components/common/SectionLoading';
import Reveal from '../components/common/Reveal';
import CourseCard from '../components/courses/CourseCard';
import useCourses from '../hooks/useCourses';
import useAgeGroups from '../hooks/useAgeGroups';
import useSettings from '../hooks/useSettings';

const ALL = '';

function FilterButton({ isActive, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive ? 'bg-primary-500 text-white shadow' : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-ink-50'
      }`}
    >
      {children}
    </button>
  );
}

export default function CoursesPage() {
  const { courses, isLoading } = useCourses();
  const { ageGroups } = useAgeGroups();
  const { settings } = useSettings();
  const section = settings.section?.courses ?? {};

  const [selectedAge, setSelectedAge] = useState(ALL);
  const [selectedCategory, setSelectedCategory] = useState(ALL);

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses],
  );

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (c) =>
          (!selectedAge || c.ageRange === selectedAge) &&
          (!selectedCategory || c.category === selectedCategory),
      ),
    [courses, selectedAge, selectedCategory],
  );

  const activeAgeGroup = ageGroups.find((group) => group.label === selectedAge);

  return (
    <article className="pt-24">
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Link to="/" className="text-sm font-medium text-primary-600 hover:underline">
            ← Volver al inicio
          </Link>

          <SectionTitle
            align="left"
            eyebrow={section.eyebrow || 'Nuestros Cursos'}
            title={section.title || 'Programas pensados para cada edad e interés'}
            subtitle={
              section.subtitle ||
              'Filtra por edad o por tipo de curso para encontrar el programa ideal.'
            }
          />

          {ageGroups.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <FilterButton isActive={selectedAge === ALL} onClick={() => setSelectedAge(ALL)}>
                Todas las edades
              </FilterButton>
              {ageGroups.map((group) => (
                <FilterButton
                  key={group.id}
                  isActive={selectedAge === group.label}
                  onClick={() => setSelectedAge(group.label === selectedAge ? ALL : group.label)}
                >
                  {group.label}
                </FilterButton>
              ))}
            </div>
          )}

          {categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterButton isActive={selectedCategory === ALL} onClick={() => setSelectedCategory(ALL)}>
                Todos los tipos
              </FilterButton>
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? ALL : category)}
                >
                  {category}
                </FilterButton>
              ))}
            </div>
          )}

          {activeAgeGroup?.advantageMessage && (
            <div className="mt-6 rounded-2xl bg-primary-50 p-5 text-sm text-primary-800 ring-1 ring-primary-100">
              <p className="font-semibold">Ventajas de aprender a los {activeAgeGroup.label}</p>
              <p className="mt-1">{activeAgeGroup.advantageMessage}</p>
            </div>
          )}

          <div className="mt-10">
            {isLoading ? (
              <SectionLoading label="Cargando cursos..." />
            ) : filteredCourses.length === 0 ? (
              <p className="text-sm text-ink-500">No hay cursos que coincidan con este filtro.</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCourses.map((course, index) => (
                  <Reveal key={course.id} delay={index * 60}>
                    <CourseCard course={course} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
