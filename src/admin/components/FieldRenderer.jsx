import FormField from '../../components/common/FormField';
import ImageUploader from './ImageUploader';
import HtmlAnimationUploader from './HtmlAnimationUploader';
import MarkdownEditor from './MarkdownEditor';

/**
 * Renderiza el input correcto según `field.type`, usado por FormModal para
 * generar formularios completos a partir de la configuración declarativa
 * de cada recurso (ver src/admin/config/resources.js).
 */
const LONG_FIELD_TYPES = ['textarea', 'list', 'image', 'html'];

function Hint({ text, className }) {
  if (!text) return null;
  return <p className={`mt-1 text-xs text-ink-400 ${className ?? ''}`}>{text}</p>;
}

export default function FieldRenderer({ field, value, onChange, error }) {
  const isFullWidth = field.fullWidth ?? LONG_FIELD_TYPES.includes(field.type);
  const commonProps = {
    label: field.label,
    name: field.name,
    error,
    className: isFullWidth ? 'sm:col-span-2' : undefined,
  };

  if (field.type === 'image') {
    return (
      <div className={commonProps.className}>
        <ImageUploader label={field.label} value={value} onChange={(url) => onChange(field.name, url)} />
      </div>
    );
  }

  if (field.type === 'html') {
    return (
      <div className={commonProps.className}>
        <HtmlAnimationUploader label={field.label} value={value} onChange={(url) => onChange(field.name, url)} />
      </div>
    );
  }

  if (field.type === 'markdown') {
    return (
      <MarkdownEditor
        label={field.label}
        name={field.name}
        value={value}
        onChange={(val) => onChange(field.name, val)}
      />
    );
  }

  if (field.type === 'checkbox') {
    // Los recursos CRUD guardan 0/1 (número); las settings guardan el texto
    // "true"/"false". Se descartan explícitamente ambas formas de "falso".
    const isChecked = value !== undefined && value !== null && value !== false && value !== 0 && value !== '0' && value !== 'false';
    return (
      <label className={`flex items-center gap-2 ${commonProps.className ?? ''}`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => onChange(field.name, event.target.checked)}
          className="h-4 w-4 rounded border-ink-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm font-medium text-ink-700">{field.label}</span>
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <FormField
        {...commonProps}
        as="select"
        value={value ?? ''}
        onChange={(event) => onChange(field.name, event.target.value)}
      >
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormField>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className={commonProps.className}>
        <FormField
          {...commonProps}
          className={undefined}
          as="textarea"
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
        <Hint text={field.hint} />
      </div>
    );
  }

  if (field.type === 'list') {
    return (
      <FormField
        {...commonProps}
        as="textarea"
        rows={field.rows ?? 4}
        placeholder={field.placeholder || 'Un elemento por línea'}
        value={Array.isArray(value) ? value.join('\n') : ''}
        onChange={(event) => onChange(field.name, event.target.value.split('\n'))}
      />
    );
  }

  if (field.type === 'number') {
    return (
      <FormField
        {...commonProps}
        type="number"
        placeholder={field.placeholder}
        value={value ?? ''}
        onChange={(event) => onChange(field.name, event.target.value === '' ? '' : Number(event.target.value))}
      />
    );
  }

  if (field.type === 'color') {
    return (
      <label className={`block ${commonProps.className ?? ''}`}>
        <span className="mb-1.5 block text-sm font-medium text-ink-700">{field.label}</span>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(event) => onChange(field.name, event.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border border-ink-100"
          />
          <span className="text-sm text-ink-500">{value}</span>
        </div>
      </label>
    );
  }

  return (
    <div className={commonProps.className}>
      <FormField
        {...commonProps}
        className={undefined}
        type={field.type || 'text'}
        placeholder={field.placeholder}
        value={value ?? ''}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
      <Hint text={field.hint} />
    </div>
  );
}
