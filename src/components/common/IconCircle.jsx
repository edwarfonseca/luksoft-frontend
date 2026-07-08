const TONES = {
  primary: 'bg-primary-50 text-primary-600',
  secondary: 'bg-secondary-400/15 text-secondary-600',
};

/**
 * Círculo de fondo suave con un emoji/ícono grande centrado.
 * Usado en Beneficios y Metodología para evitar depender de un set de iconos externo.
 */
export default function IconCircle({ icon, tone = 'primary', size = 'md' }) {
  const sizeClass = size === 'lg' ? 'h-20 w-20 text-4xl' : 'h-14 w-14 text-2xl';

  return (
    <div className={`flex items-center justify-center rounded-2xl ${sizeClass} ${TONES[tone]}`} aria-hidden="true">
      {icon}
    </div>
  );
}
