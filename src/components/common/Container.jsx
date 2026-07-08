/**
 * Envoltorio de ancho máximo + padding lateral consistente,
 * usado por todas las secciones para alinear el contenido.
 */
export default function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
