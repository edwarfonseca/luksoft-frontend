import { useEffect, useRef, useState } from 'react';

/**
 * Anima un número desde 0 hasta `end` cuando `start` se vuelve true.
 * Usado en la sección de estadísticas para dar sensación de "logro en vivo".
 */
export default function useCountUp(end, { start = false, duration = 1600 } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, end, duration]);

  return value;
}
