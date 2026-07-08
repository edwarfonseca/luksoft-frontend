import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(values.username, values.password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch {
      setError('Usuario o contraseña incorrectos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-md ring-1 ring-ink-100">
        <div className="flex items-center gap-2 text-xl font-bold text-primary-700">
          <span aria-hidden="true">🚀</span>
          LuckSoft Admin
        </div>
        <p className="mt-2 text-sm text-ink-500">Inicia sesión para administrar el sitio.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormField
            label="Usuario"
            name="username"
            value={values.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
