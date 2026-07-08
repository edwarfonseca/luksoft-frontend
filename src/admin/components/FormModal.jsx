import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import FieldRenderer from './FieldRenderer';

/** Modal con un formulario generado a partir de `fields` (ver config/resources.js). */
export default function FormModal({ open, title, fields, initialValues, onSubmit, onClose, isSubmitting }) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues || {});
    setErrors({});
  }, [initialValues, open]);

  if (!open) return null;

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.filter((item) => item.trim?.()).length === 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && isEmpty(values[field.name])) {
        newErrors[field.name] = 'Este campo es obligatorio.';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Limpia líneas vacías de los campos tipo "list" antes de enviar.
    const cleaned = { ...values };
    fields.forEach((field) => {
      if (field.type === 'list' && Array.isArray(cleaned[field.name])) {
        cleaned[field.name] = cleaned[field.name].map((line) => line.trim()).filter(Boolean);
      }
    });

    onSubmit(cleaned);
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-ink-900/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
            />
          ))}

          <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
