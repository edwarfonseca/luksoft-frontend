/**
 * Campo de formulario genérico (input, select o textarea) con label
 * y mensaje de error consistente. Reutilizado en todo el formulario de contacto.
 */
export default function FormField({ as = 'input', label, name, error, className = '', children, ...props }) {
  const Component = as;
  const baseClasses = `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-primary-500 ${
    error ? 'border-red-400' : 'border-ink-100'
  }`;

  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <Component id={name} name={name} className={baseClasses} {...props}>
        {children}
      </Component>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
