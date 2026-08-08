import { Link } from 'react-router-dom';
import Container from '../common/Container';
import BrandLogo from './BrandLogo';
import useSettings from '../../hooks/useSettings';
import { navLinks } from './navLinks';

export default function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useSettings();
  const brand = settings.brand ?? {};
  const contact = settings.contact ?? {};
  const social = settings.social ?? {};

  const socialLinks = [
    { label: 'Facebook', icon: '📘', href: social.facebook },
    { label: 'Instagram', icon: '📷', href: social.instagram },
    { label: 'TikTok', icon: '🎵', href: social.tiktok },
    { label: 'YouTube', icon: '▶️', href: social.youtube },
  ].filter((item) => item.href);

  return (
    <footer className="bg-ink-900 text-white">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <BrandLogo brand={brand} />
            {brand.siteName || 'LuckSoft Academy'}
          </Link>
          <p className="mt-4 text-sm text-white/70">
            {brand.footerTagline ||
              'Cursos en línea de tecnología y programación para niños y adolescentes de 7 a 17 años.'}
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-primary-500"
              >
                <span aria-hidden="true">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Enlaces rápidos</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <span aria-hidden="true">✉️</span>
              {contact.email || 'hola@LuckSoft.com'}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">📞</span>
              {contact.phone || '+57 300 123 4567'}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">📍</span>
              {contact.address || 'Bogotá, Colombia (clases 100% en línea)'}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Horario de atención</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>{contact.scheduleWeekdays || 'Lunes a viernes: 9:00 a 19:00'}</li>
            <li>{contact.scheduleSaturday || 'Sábados: 9:00 a 14:00'}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} {brand.siteName || 'LuckSoft Academy'}. Todos los derechos reservados.
          </p>
          <p>{brand.footerCredit || 'Hecho con 💙 para las próximas generaciones de creadores digitales.'}</p>
        </Container>
      </div>
    </footer>
  );
}
