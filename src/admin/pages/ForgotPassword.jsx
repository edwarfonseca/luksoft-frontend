import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { apiClient } from '../../lib/apiClient';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSent(true);
    } catch {
      setError('No se pudo enviar el correo. Intenta de nuevo más tarde.');
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
        <p className="mt-2 text-sm text-ink-500">Recupera el acceso a tu cuenta.</p>

        {sent ? (
          <p className="mt-6 text-sm text-ink-600">
            Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña.
            Revisa tu bandeja de entrada (y spam).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <FormField
              label="Correo electrónico"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </Button>
          </form>
        )}

        <Link to="/admin/login" className="mt-6 inline-block text-sm text-primary-600 hover:underline">
          ← Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
}
