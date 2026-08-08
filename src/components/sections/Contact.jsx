import { useLocation } from 'react-router-dom';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import FormField from '../common/FormField';
import Button from '../common/Button';
import useContactForm from '../../hooks/useContactForm';
import useCourses from '../../hooks/useCourses';
import useSettings from '../../hooks/useSettings';

const COUNTRY_CODES = [
  { value: '+57', label: '🇨🇴 +57' },
  { value: '+52', label: '🇲🇽 +52' },
  { value: '+54', label: '🇦🇷 +54' },
  { value: '+56', label: '🇨🇱 +56' },
  { value: '+51', label: '🇵🇪 +51' },
  { value: '+593', label: '🇪🇨 +593' },
  { value: '+58', label: '🇻🇪 +58' },
  { value: '+55', label: '🇧🇷 +55' },
  { value: '+1', label: '🇺🇸 +1' },
  { value: '+34', label: '🇪🇸 +34' },
];

export default function Contact() {
  const location = useLocation();
  const preselectedCourse = location.state?.selectedCourse ?? '';
  const { values, errors, status, handleChange, handleSubmit, resetStatus } = useContactForm(preselectedCourse);
  const { courses } = useCourses();
  const { settings } = useSettings();
  const section = settings.section?.contacto ?? {};
  const contact = settings.contact ?? {};

  const contactInfo = [
    { icon: '✉️', label: contact.email || 'hola@LuckSoft.com' },
    { icon: '📞', label: contact.phone || '+57 300 123 4567' },
    { icon: '📍', label: contact.address || 'Bogotá, Colombia (clases 100% en línea)' },
  ];

  return (
    <section id="contacto" className="bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow={section.eyebrow || 'Contacto'}
          title={section.title || 'Solicita información sin costo'}
          subtitle={section.subtitle || 'Cuéntanos sobre tu hijo o hija y un asesor educativo te recomendará el curso ideal.'}
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-primary-700 p-8 text-white sm:p-10">
            <h3 className="text-xl font-semibold">Hablemos</h3>
            <p className="mt-3 text-sm text-white/85">
              {contact.responseNote ||
                'Nuestro equipo te responde en menos de 24 horas hábiles para ayudarte a elegir el curso perfecto.'}
            </p>

            <ul className="mt-8 space-y-4">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3 text-sm text-white/90">
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-md ring-1 ring-ink-100 sm:p-10">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="text-5xl" aria-hidden="true">
                  🎉
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink-900">¡Mensaje enviado!</h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600">
                  Gracias por escribirnos. Un asesor educativo se pondrá en contacto contigo muy pronto.
                </p>
              </div>
            ) : status === 'error' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="text-5xl" aria-hidden="true">
                  ⚠️
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink-900">Ocurrió un problema</h3>
                <p className="mt-2 max-w-sm text-sm text-ink-600">
                  No pudimos enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente al correo.
                </p>
                <button
                  onClick={resetStatus}
                  className="mt-4 rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Nombre completo"
                  name="nombre"
                  placeholder="Nombre de madre/padre o estudiante"
                  value={values.nombre}
                  onChange={handleChange}
                  error={errors.nombre}
                  className="sm:col-span-1"
                />
                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  className="sm:col-span-1"
                />
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-sm font-medium text-ink-700">Teléfono</span>
                  <div className="flex gap-2">
                    <select
                      name="codigoPais"
                      value={values.codigoPais}
                      onChange={handleChange}
                      aria-label="Código de país"
                      className="w-24 rounded-xl border border-ink-100 bg-white px-2 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-primary-500"
                    >
                      {COUNTRY_CODES.map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </select>
                    <input
                      name="telefono"
                      type="tel"
                      inputMode="numeric"
                      placeholder="300 123 4567"
                      value={values.telefono}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-primary-500 ${
                        errors.telefono ? 'border-red-400' : 'border-ink-100'
                      }`}
                    />
                  </div>
                  {errors.telefono && <span className="mt-1 block text-xs text-red-500">{errors.telefono}</span>}
                </label>
                <FormField
                  as="select"
                  label="Curso de interés"
                  name="curso"
                  value={values.curso}
                  onChange={handleChange}
                  error={errors.curso}
                  className="sm:col-span-1"
                >
                  <option value="">Selecciona un curso</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.slug}>
                      {course.title}
                    </option>
                  ))}
                  <option value="orientacion">Aún no estoy seguro, quiero orientación</option>
                </FormField>
                <FormField
                  as="textarea"
                  label="Mensaje (opcional)"
                  name="mensaje"
                  rows={4}
                  placeholder="Cuéntanos la edad e intereses de tu hijo o hija..."
                  value={values.mensaje}
                  onChange={handleChange}
                  error={errors.mensaje}
                  className="sm:col-span-2"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
