import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { apiClient } from '../../lib/apiClient';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigate = useNavigate();

  const [values, setValues] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (values.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post('/auth/reset-password', { token, newPassword: values.newPassword });
      setDone(true);
      setTimeout(() => navigate('/admin/login', { replace: true }), 2000);
    } catch (err) {
      setError(err.message || 'El enlace es inválido o expiró.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-md ring-1 ring-ink-100 text-center">
          <p className="text-sm text-ink-600">Enlace de recuperación inválido.</p>
          <Link to="/admin/forgot-password" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
            Solicitar uno nuevo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-md ring-1 ring-ink-100">
        <div className="flex items-center gap-2 text-xl font-bold text-primary-700">
          <span aria-hidden="true">🚀</span>
          LuckSoft Admin
        </div>
        <p className="mt-2 text-sm text-ink-500">Elige una nueva contraseña.</p>

        {done ? (
          <p className="mt-6 text-sm text-green-600">Contraseña actualizada. Redirigiendo a inicio de sesión…</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <FormField
              label="Nueva contraseña"
              name="newPassword"
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <FormField
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Restablecer contraseña'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
