import { useEffect, useState } from 'react';

function computeRemaining(target) {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };

  const totalMs = new Date(target).getTime() - Date.now();
  if (Number.isNaN(totalMs) || totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
    isExpired: false,
  };
}

/** Cuenta regresiva en vivo hacia una fecha límite (string parseable por Date). */
export default function useCountdown(targetDate) {
  const [remaining, setRemaining] = useState(() => computeRemaining(targetDate));

  useEffect(() => {
    setRemaining(computeRemaining(targetDate));
    if (!targetDate) return undefined;

    const timer = setInterval(() => setRemaining(computeRemaining(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return remaining;
}
