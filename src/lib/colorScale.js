/**
 * Deriva una escala completa de tints/shades (50..900) a partir de un único
 * color base, manipulando solo la Luminosidad en HSL. Permite que el admin
 * elija un único color de marca y el sitio entero se vea coherente, sin
 * tener que pedirle 7 tonos distintos.
 */

function hexToHsl(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function generateScale(hexBase) {
  if (!hexBase) return null;
  const { h, s, l } = hexToHsl(hexBase);

  return {
    50: hslToHex(h, clamp(s - 35, 10), 96),
    100: hslToHex(h, clamp(s - 25, 15), 91),
    300: hslToHex(h, s, clamp(l + 20, 0, 80)),
    400: hslToHex(h, s, clamp(l + 8, 0, 85)),
    500: hexBase,
    600: hslToHex(h, s, clamp(l - 8)),
    700: hslToHex(h, s, clamp(l - 16)),
    900: hslToHex(h, clamp(s + 10), 14),
  };
}
