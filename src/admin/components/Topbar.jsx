import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4">
      <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-600 hover:underline">
        Ver sitio público ↗
      </a>

      <div className="flex items-center gap-4">
        <span className="text-sm text-ink-600">
          Hola, <strong className="text-ink-900">{user?.username}</strong>
        </span>
        <button
          onClick={handleLogout}
          className="rounded-full border border-ink-200 px-4 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
