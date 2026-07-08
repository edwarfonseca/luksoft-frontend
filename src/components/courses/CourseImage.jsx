const GRADIENTS = {
  primary: 'from-primary-300 via-primary-500 to-primary-700',
  secondary: 'from-secondary-300 via-secondary-400 to-secondary-600',
};

/**
 * Ilustración del curso: un degradado de marca con el emoji representativo.
 * Evita depender de fotografías externas mientras mantiene una identidad visual
 * consistente y rápida de cargar para cada curso.
 */
export default function CourseImage({ icon, color = 'primary', className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${GRADIENTS[color]} ${className}`}
    >
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/15" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
      <span className="relative text-6xl drop-shadow-sm" aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}
