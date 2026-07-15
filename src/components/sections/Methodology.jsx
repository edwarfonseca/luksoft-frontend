import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import SectionLoading from '../common/SectionLoading';
import Reveal from '../common/Reveal';
import useMethodologySteps from '../../hooks/useMethodologySteps';
import useSettings from '../../hooks/useSettings';

export default function Methodology() {
  const { steps, isLoading } = useMethodologySteps();
  const { settings } = useSettings();
  const section = settings.section?.methodology ?? {};

  if (!isLoading && steps.length === 0) return null;

  return (
    <section id="metodologia" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Nuestra Metodología'}
          title={section.title || 'Aprender programando, no memorizando'}
          subtitle={
            section.subtitle || 'Un proceso de 4 pasos que convierte cada clase en un logro tangible para el estudiante.'
          }
        />

        {isLoading ? (
          <SectionLoading label="Cargando metodología..." />
        ) : (
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Línea conectora visible solo en escritorio */}
            <div className="absolute top-10 left-0 right-0 hidden h-0.5 bg-primary-100 lg:block" />

            {steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 100}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 text-3xl text-white shadow-lg shadow-primary-500/30">
                    <span aria-hidden="true">{step.icon}</span>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary-500 text-xs font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
