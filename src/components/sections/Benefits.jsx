import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import Reveal from '../common/Reveal';
import IconCircle from '../common/IconCircle';
import useBenefits from '../../hooks/useBenefits';
import useSettings from '../../hooks/useSettings';

export default function Benefits() {
  const { benefits, isLoading } = useBenefits();
  const { settings } = useSettings();
  const section = settings.section?.benefits ?? {};

  return (
    <section className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || '¿Por qué LuckSoft?'}
          title={section.title || 'Una experiencia de aprendizaje pensada para cada familia'}
          subtitle={
            section.subtitle ||
            'Combinamos pedagogía, tecnología y acompañamiento humano para que cada estudiante avance a su propio ritmo.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando beneficios..." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.id} delay={index * 60}>
                <div className="flex h-full gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-shadow hover:shadow-lg">
                  <IconCircle icon={benefit.icon} tone={index % 2 === 0 ? 'primary' : 'secondary'} />
                  <div>
                    <h3 className="font-semibold text-ink-900">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-ink-600">{benefit.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
