const VARIANTS = {
  primary:
    'bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/40 hover:-translate-y-0.5',
  secondary:
    'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5',
  outline:
    'bg-white text-primary-700 border-2 border-primary-500 hover:bg-primary-50 hover:-translate-y-0.5',
  ghost: 'bg-white/15 text-white border-2 border-white/70 hover:bg-white/25 hover:-translate-y-0.5',
};

const SIZES = {
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base sm:text-lg',
};

/**
 * Botón reutilizable y polimórfico: por defecto renderiza un <button>,
 * pero acepta `as={Link}` (React Router) o `as="a"` para usarse como enlace
 * manteniendo exactamente el mismo estilo visual en toda la app.
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
