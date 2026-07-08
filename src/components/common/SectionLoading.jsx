/** Indicador de carga consistente para secciones que dependen de datos del API. */
export default function SectionLoading({ label = 'Cargando contenido...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-ink-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-200 border-t-primary-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
