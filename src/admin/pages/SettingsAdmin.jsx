import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { groupSettings } from '../../lib/settingsShape';
import { PreviewSettingsContext } from '../../lib/previewSettingsContext';
import { applyTheme } from '../../lib/themeRuntime';
import Button from '../../components/common/Button';
import Hero from '../../components/sections/Hero';
import FieldRenderer from '../components/FieldRenderer';
import { useToast } from '../components/ToastProvider';
import { navLinks } from '../../components/layout/navLinks';

const SECTION_LABELS = {
  courses: 'Cursos',
  benefits: 'Beneficios',
  methodology: 'Metodología',
  experiencia: 'Experiencia',
  galeria: 'Galería',
  testimonios: 'Testimonios',
  blog: 'Blog',
  faq: 'Preguntas Frecuentes',
  contacto: 'Contacto',
};

const TABS = [
  {
    key: 'brand',
    label: 'Marca y colores',
    fields: [
      { name: 'brand.siteName', label: 'Nombre del sitio', type: 'text' },
      { name: 'brand.logoUrl', label: 'Logo', type: 'image' },
      { name: 'theme.primaryColor', label: 'Color primario', type: 'color' },
      { name: 'theme.secondaryColor', label: 'Color secundario', type: 'color' },
      { name: 'brand.footerTagline', label: 'Descripción en el footer', type: 'textarea', rows: 2 },
      { name: 'brand.footerCredit', label: 'Línea final del footer', type: 'text' },
    ],
  },
  {
    key: 'hero',
    label: 'Inicio (Hero)',
    fields: [
      { name: 'hero.imageUrl', label: 'Imagen de fondo (opcional)', type: 'image' },
      { name: 'hero.animationUrl', label: 'Animación del lado derecho (.html, opcional)', type: 'html' },
      { name: 'hero.badge', label: 'Etiqueta superior', type: 'text' },
      { name: 'hero.title', label: 'Título principal', type: 'textarea', rows: 2 },
      { name: 'hero.subtitle', label: 'Subtítulo', type: 'textarea', rows: 3 },
      { name: 'hero.ctaPrimary', label: 'Texto del botón principal', type: 'text' },
      { name: 'hero.ctaSecondary', label: 'Texto del botón secundario', type: 'text' },
      { name: 'hero.statLine', label: 'Línea de estadística destacada', type: 'text' },
    ],
  },
  {
    key: 'promo',
    label: 'Promoción',
    fields: [
      { name: 'promo.enabled', label: 'Mostrar banner de promoción', type: 'checkbox' },
      { name: 'promo.badgeText', label: 'Etiqueta (ej. "LuckSoft Day")', type: 'text' },
      { name: 'promo.title', label: 'Mensaje principal', type: 'text' },
      { name: 'promo.priceBefore', label: 'Precio antes (sin formato, ej. 999000)', type: 'number' },
      { name: 'promo.priceNow', label: 'Precio ahora (sin formato, ej. 799900)', type: 'number' },
      { name: 'promo.installments', label: 'Texto de cuotas (ej. "Paga en 4 cuotas")', type: 'text' },
      { name: 'promo.ctaText', label: 'Texto del botón', type: 'text' },
      {
        name: 'promo.ctaTarget',
        label: 'Página a la que lleva el botón',
        type: 'select',
        options: [{ value: '/', label: 'Inicio' }, ...navLinks.map((link) => ({ value: link.path, label: link.label }))],
      },
      {
        name: 'promo.deadline',
        label: 'Fecha y hora límite (activa el contador)',
        type: 'datetime-local',
        hint: 'Déjalo vacío para no mostrar contador regresivo.',
      },
      { name: 'promo.imageUrl', label: 'Imagen lateral (opcional)', type: 'image' },
      { name: 'promo.backgroundColor', label: 'Color de fondo (inicio)', type: 'color' },
      { name: 'promo.backgroundColorSecondary', label: 'Color de fondo (final)', type: 'color' },
    ],
  },
  {
    key: 'contact',
    label: 'Contacto y redes',
    fields: [
      { name: 'contact.email', label: 'Correo', type: 'text' },
      { name: 'contact.phone', label: 'Teléfono', type: 'text' },
      { name: 'contact.address', label: 'Dirección', type: 'text' },
      { name: 'contact.scheduleWeekdays', label: 'Horario (lunes a viernes)', type: 'text' },
      { name: 'contact.scheduleSaturday', label: 'Horario (sábados)', type: 'text' },
      { name: 'contact.responseNote', label: 'Nota de tiempo de respuesta', type: 'textarea', rows: 2 },
      { name: 'social.facebook', label: 'Facebook (URL)', type: 'text' },
      { name: 'social.instagram', label: 'Instagram (URL)', type: 'text' },
      { name: 'social.tiktok', label: 'TikTok (URL)', type: 'text' },
      { name: 'social.youtube', label: 'YouTube (URL)', type: 'text' },
    ],
  },
  {
    key: 'sections',
    label: 'Textos de secciones',
    fields: Object.entries(SECTION_LABELS).flatMap(([key, label]) => [
      { name: `section.${key}.eyebrow`, label: `${label} — Etiqueta`, type: 'text' },
      { name: `section.${key}.title`, label: `${label} — Título`, type: 'text' },
      { name: `section.${key}.subtitle`, label: `${label} — Subtítulo`, type: 'textarea', rows: 2 },
    ]),
  },
  {
    key: 'notifications',
    label: 'Notificaciones',
    fields: [
      {
        name: 'notify.emails',
        label: 'Correos que reciben el formulario',
        type: 'textarea',
        rows: 3,
        hint: 'Separa varios correos con comas. Ej: hola@empresa.com, ventas@empresa.com',
      },
      {
        name: 'notify.whatsappNumbers',
        label: 'Números de WhatsApp que reciben el formulario',
        type: 'textarea',
        rows: 3,
        hint: 'Separa con comas. Usa formato internacional con +. Ej: +573001234567, +573109876543',
      },
    ],
  },
];

export default function SettingsAdmin() {
  const [values, setValues] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    apiClient.get('/settings').then(setValues);
  }, []);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name === 'theme.primaryColor' || name === 'theme.secondaryColor') {
      applyTheme({
        primaryColor: name === 'theme.primaryColor' ? value : values['theme.primaryColor'],
        secondaryColor: name === 'theme.secondaryColor' ? value : values['theme.secondaryColor'],
      });
    }
  };

  const previewSettings = useMemo(() => (values ? groupSettings(values) : null), [values]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.put('/settings', values);
      addToast('Configuración guardada correctamente.');
    } catch (err) {
      addToast(err.message || 'No se pudo guardar la configuración.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!values) {
    return <p className="text-sm text-ink-500">Cargando configuración...</p>;
  }

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Configuración</h1>
          <p className="mt-1 text-sm text-ink-500">
            Cambia textos, contacto, redes y marca. Los cambios de color se ven al instante.
          </p>
        </div>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex gap-2 overflow-x-auto border-b border-ink-100 pb-px">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-primary-500 text-primary-700'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100 sm:grid-cols-2">
            {currentTab.fields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-2 text-sm font-medium text-ink-500">Vista previa en vivo</p>
          <div className="overflow-hidden rounded-2xl bg-ink-900 shadow-sm ring-1 ring-ink-100">
            <div className="h-[420px] origin-top-left overflow-hidden" style={{ width: '200%', transform: 'scale(0.5)' }}>
              <PreviewSettingsContext.Provider value={previewSettings}>
                <Hero />
              </PreviewSettingsContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
