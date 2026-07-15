import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import StatCard from './StatCard';
import useStats from '../../hooks/useStats';
import useSettings from '../../hooks/useSettings';

export default function Stats() {
  const { stats, isLoading } = useStats();
  const { settings } = useSettings();
  const section = settings.section?.experiencia ?? {};

  if (!isLoading && stats.length === 0) return null;

  return (
    <section id="experiencia" className="bg-gradient-to-r from-primary-700 to-primary-500 py-20 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Experiencia'}
          title={section.title || 'Una comunidad global de jóvenes creadores'}
          subtitle={section.subtitle || 'Los números reflejan la confianza de miles de familias en nuestra metodología.'}
          light
        />

        {isLoading ? (
          <SectionLoading label="Cargando estadísticas..." />
        ) : (
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
