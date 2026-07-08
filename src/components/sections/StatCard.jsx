import useInView from '../../hooks/useInView';
import useCountUp from '../../hooks/useCountUp';

/**
 * Tarjeta individual de estadística: anima su número de 0 al valor final
 * apenas entra en el viewport, dando una sensación de "logro en vivo".
 */
export default function StatCard({ value, suffix, label }) {
  const [ref, isVisible] = useInView({ threshold: 0.4 });
  const count = useCountUp(value, { start: isVisible });

  return (
    <div ref={ref} className="text-center text-white">
      <p className="text-4xl font-bold sm:text-5xl">
        {count.toLocaleString('es-MX')}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-white/80 sm:text-base">{label}</p>
    </div>
  );
}
