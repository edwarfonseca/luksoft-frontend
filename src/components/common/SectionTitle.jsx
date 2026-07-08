/**
 * Encabezado estándar de sección: etiqueta pequeña + título + subtítulo,
 * centrado por defecto. Reutilizado en Cursos, Beneficios, Metodología, etc.
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignClass} mb-12`}>
      {eyebrow && (
        <span
          className={`inline-block rounded-full px-4 py-1 text-sm font-semibold tracking-wide mb-4 ${
            light ? 'bg-white/15 text-white' : 'bg-secondary-400/15 text-secondary-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-semibold leading-tight ${light ? 'text-white' : 'text-ink-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg ${light ? 'text-white/85' : 'text-ink-600'}`}>{subtitle}</p>
      )}
    </div>
  );
}
