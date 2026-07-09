import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import useCountdown from '../../hooks/useCountdown';

const DISMISS_KEY = 'LuckSoft_promo_dismissed';

function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n.toLocaleString('es-CO', { maximumFractionDigits: 0 });
}

/**
 * Banner de promoción/descuento en la parte superior del sitio (estilo
 * "Platzi Day"), editable desde el admin (Configuración > Promoción).
 * Si el admin cambia la promoción, el "signature" cambia y el banner
 * vuelve a mostrarse aunque el usuario haya cerrado uno anterior.
 */
const PromoBanner = forwardRef(function PromoBanner(_props, ref) {
  const { settings } = useSettings();
  const promo = settings.promo ?? {};
  const isEnabled = promo.enabled === 'true' && Boolean(promo.title);

  const signature = [promo.title, promo.priceNow, promo.deadline].join('|');
  const [dismissedSignature, setDismissedSignature] = useState(() => {
    try { return localStorage.getItem(DISMISS_KEY) ?? ''; } catch { return ''; }
  });

  const countdown = useCountdown(promo.deadline);
  const hasDeadline = Boolean(promo.deadline);
  const isVisible = isEnabled && dismissedSignature !== signature && !(hasDeadline && countdown.isExpired);

  const handleClose = () => {
    try { localStorage.setItem(DISMISS_KEY, signature); } catch { /* noop */ }
    setDismissedSignature(signature);
  };

  if (!isVisible) return <div ref={ref} />;

  const priceNow = formatPrice(promo.priceNow);
  const priceBefore = formatPrice(promo.priceBefore);
  const savings =
    priceBefore && priceNow && Number(promo.priceBefore) > Number(promo.priceNow)
      ? formatPrice(Number(promo.priceBefore) - Number(promo.priceNow))
      : null;

  const bgStyle = {
    background: `linear-gradient(100deg, ${promo.backgroundColor || '#f97316'}, ${promo.backgroundColorSecondary || '#ea580c'})`,
  };

  return (
    <div ref={ref} className="fixed inset-x-0 top-0 z-[60] overflow-hidden text-ink-900" style={bgStyle}>
      {/* Patrón decorativo, solo visible en pantallas grandes */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-36 opacity-25 lg:block"
        style={{
          backgroundImage: 'repeating-linear-gradient(115deg, #1c1917 0 14px, transparent 14px 30px)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 pr-14 sm:px-8 lg:flex-nowrap lg:pl-44">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {promo.badgeText && (
            <span className="inline-block w-fit rounded-md bg-white px-3 py-1 text-sm font-bold text-ink-900">
              {promo.badgeText}
            </span>
          )}

          <p className="max-w-2xl text-lg font-extrabold leading-snug sm:text-xl">{promo.title}</p>

          {(priceNow || priceBefore || promo.installments) && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
              {priceNow && (
                <span className="font-bold">
                  🇨🇴 ${priceNow}
                  {savings && <span className="ml-2 font-semibold">Ahorras ${savings}</span>}
                </span>
              )}
              {(priceBefore || promo.installments) && (
                <span className="opacity-85">
                  {priceBefore && (
                    <>
                      Antes <span className="line-through">${priceBefore}</span>
                    </>
                  )}
                  {priceBefore && promo.installments && ' | '}
                  {promo.installments}
                </span>
              )}
            </div>
          )}

          {promo.ctaText && (
            <Link
              to={promo.ctaTarget || '/contacto'}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-ink-900 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              {promo.ctaText} <span aria-hidden="true">⏱️</span>
            </Link>
          )}
        </div>

        {hasDeadline && (
          <div className="flex flex-col items-start gap-1.5 text-sm font-medium sm:items-center">
            <span>Últimas Horas:</span>
            <div className="flex items-center gap-1.5">
              {[
                [countdown.days, 'd'],
                [countdown.hours, 'h'],
                [countdown.minutes, 'm'],
                [countdown.seconds, 's'],
              ].map(([value, unit]) => (
                <span key={unit} className="rounded-md bg-ink-900 px-2.5 py-1.5 font-mono text-sm text-white">
                  {String(value).padStart(2, '0')}
                  {unit}
                </span>
              ))}
            </div>
          </div>
        )}

        {promo.imageUrl && (
          <img
            src={promo.imageUrl}
            alt=""
            className="hidden h-24 w-24 flex-shrink-0 rounded-xl object-cover shadow-lg lg:block"
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar promoción"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-900/70 hover:bg-black/10"
      >
        ✕
      </button>
    </div>
  );
});

export default PromoBanner;
