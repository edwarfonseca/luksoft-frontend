import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';
import { apiClient } from '../../lib/apiClient';
import { useToast } from '../components/ToastProvider';

export default function AccountAdmin() {
  const { addToast } = useToast();

  const [emails, setEmails] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [isAddingEmail, setIsAddingEmail] = useState(false);

  const [passwordValues, setPasswordValues] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const loadEmails = () => apiClient.get('/auth/recovery-emails').then(setEmails);

  useEffect(() => {
    loadEmails();
  }, []);

  const handleAddEmail = async (event) => {
    event.preventDefault();
    setIsAddingEmail(true);
    try {
      await apiClient.post('/auth/recovery-emails', { email: newEmail });
      setNewEmail('');
      await loadEmails();
      addToast('Correo de recuperación agregado.');
    } catch (err) {
      addToast(err.message || 'No se pudo agregar el correo.', 'error');
    } finally {
      setIsAddingEmail(false);
    }
  };

  const handleRemoveEmail = async (id) => {
    try {
      await apiClient.del(`/auth/recovery-emails/${id}`);
      await loadEmails();
      addToast('Correo eliminado.');
    } catch (err) {
      addToast(err.message || 'No se pudo eliminar el correo.', 'error');
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async (event) => {
    event.preventDefault();
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      addToast('Las contraseñas nuevas no coinciden.', 'error');
      return;
    }

    setIsSavingPassword(true);
    try {
      await apiClient.put('/auth/password', {
        currentPassword: passwordValues.currentPassword,
        newPassword: passwordValues.newPassword,
      });
      setPasswordValues({ currentPassword: '', newPassword: '', confirmPassword: '' });
      addToast('Contraseña actualizada correctamente.');
    } catch (err) {
      addToast(err.message || 'No se pudo cambiar la contraseña.', 'error');
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Mi cuenta</h1>
      <p className="mt-1 text-sm text-ink-500">
        Cambia tu contraseña y administra los correos de recuperación.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
          <h2 className="font-semibold text-ink-900">Correos de recuperación</h2>
          <p className="mt-1 text-sm text-ink-500">
            Si olvidas tu contraseña, el enlace de recuperación se enviará a cualquiera de estos correos.
          </p>

          {emails ? (
            <ul className="mt-4 space-y-2">
              {emails.primary && (
                <li className="flex items-center justify-between rounded-xl bg-ink-50 px-3 py-2 text-sm">
                  <span>{emails.primary}</span>
                  <span className="text-xs font-medium text-ink-400">Principal</span>
                </li>
              )}
              {emails.extra.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-xl bg-ink-50 px-3 py-2 text-sm">
                  <span>{item.email}</span>
                  <button
                    onClick={() => handleRemoveEmail(item.id)}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-400">Cargando...</p>
          )}

          <form onSubmit={handleAddEmail} className="mt-4 flex items-end gap-2">
            <div className="flex-1">
              <FormField
                label="Agregar correo"
                name="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="secondary" disabled={isAddingEmail}>
              {isAddingEmail ? 'Agregando...' : 'Agregar'}
            </Button>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100">
          <h2 className="font-semibold text-ink-900">Cambiar contraseña</h2>

          <form onSubmit={handleSavePassword} className="mt-4 space-y-4">
            <FormField
              label="Contraseña actual"
              name="currentPassword"
              type="password"
              value={passwordValues.currentPassword}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              required
            />
            <FormField
              label="Nueva contraseña"
              name="newPassword"
              type="password"
              value={passwordValues.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />
            <FormField
              label="Confirmar nueva contraseña"
              name="confirmPassword"
              type="password"
              value={passwordValues.confirmPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />
            <Button type="submit" variant="primary" disabled={isSavingPassword}>
              {isSavingPassword ? 'Guardando...' : 'Cambiar contraseña'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
