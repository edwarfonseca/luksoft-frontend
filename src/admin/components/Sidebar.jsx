import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Resumen', icon: '📊', end: true },
  { to: '/admin/cursos', label: 'Cursos', icon: '🎓' },
  { to: '/admin/grupos-edad', label: 'Grupos de edad', icon: '🎂' },
  { to: '/admin/testimonios', label: 'Testimonios', icon: '💬' },
  { to: '/admin/beneficios', label: 'Beneficios', icon: '✨' },
  { to: '/admin/metodologia', label: 'Metodología', icon: '🧭' },
  { to: '/admin/estadisticas', label: 'Estadísticas', icon: '📈' },
  { to: '/admin/galeria', label: 'Galería', icon: '🖼️' },
  { to: '/admin/blog', label: 'Blog', icon: '📰' },
  { to: '/admin/faq', label: 'Preguntas Frecuentes', icon: '❓' },
  { to: '/admin/leads', label: 'Leads / Solicitudes', icon: '📋' },
  { to: '/admin/configuracion', label: 'Configuración', icon: '⚙️' },
  { to: '/admin/cuenta', label: 'Mi cuenta', icon: '🔐' },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-ink-100 bg-white p-4 sm:flex">
      <div className="flex items-center gap-2 px-2 py-3 text-lg font-bold text-primary-700">
        <span aria-hidden="true">🚀</span>
        LuckSoft Admin
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-50'
              }`
            }
          >
            <span aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
