import Button from '../common/Button';
import Container from '../common/Container';
import useSectionNavigate from '../../hooks/useSectionNavigate';
import useSettings from '../../hooks/useSettings';

const floatingIcons = [
  { icon: '💻', className: 'top-2 left-2 sm:top-4 sm:left-6', delay: '0s' },
  { icon: '🐍', className: 'top-1/3 -right-2 sm:right-2', delay: '1.2s' },
  { icon: '🎮', className: 'bottom-10 left-0 sm:left-4', delay: '2.1s' },
  { icon: '🤖', className: 'bottom-0 right-1/4', delay: '0.6s' },
  { icon: '🚀', className: 'top-0 right-1/3', delay: '1.8s' },
];

export default function Hero() {
  const goToSection = useSectionNavigate();
  const { settings } = useSettings();
  const hero = settings.hero ?? {};

  const bgStyle = hero.imageUrl
    ? { backgroundImage: `url(${hero.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={bgStyle}
    >
      {hero.imageUrl && <div className="absolute inset-0 bg-primary-900/60" />}
      {/* Blobs decorativos de fondo */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-secondary-400/30 blur-3xl animate-blob" />
      <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-primary-300/30 blur-3xl animate-blob" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
            {hero.badge || '🎓 Cursos en línea para niños y adolescentes de 7 a 17 años'}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {hero.title || 'Impulsa el futuro de tus hijos con cursos de tecnología y programación'}
          </h1>

          <p className="mt-6 text-lg text-white/85">
            {hero.subtitle ||
              'Clases en vivo, profesores especializados y proyectos reales que despiertan la creatividad, la lógica y la confianza de niños y adolescentes en el mundo digital.'}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button variant="primary" size="lg" onClick={() => goToSection('cursos')}>
              {hero.ctaPrimary || 'Ver Cursos'}
            </Button>
            <Button variant="ghost" size="lg" onClick={() => goToSection('contacto')}>
              {hero.ctaSecondary || 'Solicitar Información'}
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-white/80 lg:justify-start">
            <p className="text-sm">{hero.statLine || '+5,000 estudiantes ya están creando con código'}</p>
          </div>
        </div>

        {/* Ilustración: laptop central con íconos tecnológicos flotando alrededor */}
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
          <div className="absolute h-56 w-56 rounded-full bg-white/10 sm:h-72 sm:w-72" />
          <div className="absolute flex h-40 w-40 items-center justify-center rounded-3xl bg-white shadow-2xl sm:h-48 sm:w-48 animate-float">
            <span className="text-6xl sm:text-7xl" aria-hidden="true">
              👩‍💻
            </span>
          </div>

          {floatingIcons.map(({ icon, className, delay }) => (
            <span
              key={icon}
              className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg animate-float ${className}`}
              style={{ animationDelay: delay }}
              aria-hidden="true"
            >
              {icon}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
