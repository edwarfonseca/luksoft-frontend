import useInView from '../../hooks/useInView';

/**
 * Envuelve cualquier bloque para aplicarle una animación de aparición
 * suave al entrar en el viewport. `delay` acepta milisegundos.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
