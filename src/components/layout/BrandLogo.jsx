/**
 * Ícono de marca usado junto al nombre del sitio en Navbar y Footer.
 * Si el admin subió un logo propio (brand.logoUrl) se usa ese; si no,
 * cae en la "L" de marca (public/favicon.svg, mismo ícono de la pestaña).
 */
export default function BrandLogo({ brand, className = 'h-8 w-8' }) {
  const src = brand.logoUrl || '/favicon.svg';
  return (
    <img
      src={src}
      alt={brand.siteName || 'LuckSoft Academy'}
      className={`${className} rounded-lg object-cover`}
    />
  );
}
