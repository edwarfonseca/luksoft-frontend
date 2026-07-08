import { generateScale } from './colorScale';

const PRIMARY_STEPS = [50, 100, 300, 500, 600, 700, 900];
const SECONDARY_STEPS = [300, 400, 500, 600];

/**
 * Sobrescribe las variables CSS de marca en :root. Tailwind v4 compila las
 * utilidades (`bg-primary-500`, etc.) como `var(--color-primary-500)`, así
 * que esto re-temiza todo el sitio en runtime sin recompilar CSS.
 */
export function applyTheme({ primaryColor, secondaryColor } = {}) {
  const root = document.documentElement;

  if (primaryColor) {
    const scale = generateScale(primaryColor);
    PRIMARY_STEPS.forEach((step) => root.style.setProperty(`--color-primary-${step}`, scale[step]));
  }

  if (secondaryColor) {
    const scale = generateScale(secondaryColor);
    SECONDARY_STEPS.forEach((step) => root.style.setProperty(`--color-secondary-${step}`, scale[step]));
  }
}
