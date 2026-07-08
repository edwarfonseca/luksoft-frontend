const TONES = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-400/15 text-secondary-600',
  neutral: 'bg-ink-100 text-ink-600',
};

/**
 * Etiqueta pequeña usada para metadatos (edad, duración, nivel) en las tarjetas de curso.
 */
export default function Badge({ icon, children, tone = 'neutral' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${TONES[tone]}`}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
