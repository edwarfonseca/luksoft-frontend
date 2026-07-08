import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/apiClient';

const CARDS = [
  { key: 'courses', label: 'Cursos', icon: '🎓', to: '/admin/cursos' },
  { key: 'testimonials', label: 'Testimonios', icon: '💬', to: '/admin/testimonios' },
  { key: 'benefits', label: 'Beneficios', icon: '✨', to: '/admin/beneficios' },
  { key: 'methodology_steps', label: 'Pasos de metodología', icon: '🧭', to: '/admin/metodologia' },
  { key: 'stats', label: 'Estadísticas', icon: '📈', to: '/admin/estadisticas' },
  { key: 'gallery_items', label: 'Imágenes en galería', icon: '🖼️', to: '/admin/galeria' },
  { key: 'blog_posts', label: 'Publicaciones de blog', icon: '📰', to: '/admin/blog' },
  { key: 'faqs', label: 'Preguntas frecuentes', icon: '❓', to: '/admin/faq' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    apiClient.get('/admin/summary').then(setSummary).catch(() => setSummary({}));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Resumen</h1>
      <p className="mt-1 text-sm text-ink-500">Un vistazo rápido al contenido del sitio.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            to={card.to}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100 transition-shadow hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">
              {card.icon}
            </span>
            <p className="mt-3 text-3xl font-bold text-ink-900">{summary?.[card.key] ?? '—'}</p>
            <p className="mt-1 text-sm text-ink-500">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
