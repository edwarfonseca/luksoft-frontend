import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import Container from '../common/Container';
import useSectionNavigate from '../../hooks/useSectionNavigate';
import useSettings from '../../hooks/useSettings';
import { navLinks } from './navLinks';

// Únicas rutas cuyo tope de página tiene un fondo oscuro (Hero / banner de
// curso) detrás del navbar — solo ahí tiene sentido el estado transparente.
const DARK_TOP_ROUTES = [/^\/$/, /^\/cursos\//];

/**
 * Barra de navegación fija. Cambia de apariencia al hacer scroll
 * y colapsa en un menú móvil tipo "hamburguesa" en pantallas pequeñas.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const goToSection = useSectionNavigate();
  const { settings } = useSettings();
  const brand = settings.brand ?? {};
  const { pathname } = useLocation();

  const hasDarkTopBackground = DARK_TOP_ROUTES.some((pattern) => pattern.test(pathname));

  // El header se vuelve sólido al hacer scroll, al abrir el menú móvil, o en
  // cualquier página cuyo tope no tenga un fondo oscuro detrás (de lo
  // contrario el texto blanco quedaría invisible sobre fondo blanco).
  const isSolid = isScrolled || isMenuOpen || !hasDarkTopBackground;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Evita el scroll del body cuando el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    goToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white/0'
      }`}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        <Link
          to="/"
          className={`flex items-center gap-2 text-xl font-bold transition-colors duration-300 ${
            isSolid ? 'text-primary-700' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {brand.logoUrl ? (
            <img src={brand.logoUrl} alt={brand.siteName || 'LuckSoft'} className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <span className="text-2xl" aria-hidden="true">
              🚀
            </span>
          )}
          {brand.siteName || 'LuckSoft'}
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 hover:text-secondary-400 ${
                isSolid ? 'text-ink-600' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button variant="primary" size="md" onClick={() => handleNavClick('contacto')}>
            Inscríbete Ahora
          </Button>
        </div>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full text-2xl transition-colors duration-300 xl:hidden ${
            isSolid ? 'text-primary-700' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </Container>

      {/* Menú móvil desplegable */}
      <div
        className={`overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 xl:hidden ${
          isMenuOpen ? 'max-h-[28rem]' : 'max-h-0'
        }`}
      >
        <Container className="flex flex-col gap-3 py-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="rounded-lg px-2 py-2 text-left text-sm font-medium text-ink-600 hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </button>
          ))}
          <Button variant="primary" size="md" className="mt-2 w-full" onClick={() => handleNavClick('contacto')}>
            Inscríbete Ahora
          </Button>
        </Container>
      </div>
    </header>
  );
}
