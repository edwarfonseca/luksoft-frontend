import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AUTH_EXPIRED_EVENT, apiClient, tokenStore } from '../../lib/apiClient';

const AuthContext = createContext(null);

// Cada cuánto se revalida la sesión en segundo plano, para detectar la
// expiración del token (1h) aunque el usuario no dispare ninguna petición.
const SESSION_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    apiClient
      .get('/auth/me')
      .then((current) => setUser(current))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Si el token expira (401 en cualquier petición) o pasa el intervalo de
  // chequeo, cierra la sesión para que el AuthGuard redirija al login.
  useEffect(() => {
    const handleExpired = () => setUser(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);

    const interval = setInterval(refresh, SESSION_CHECK_INTERVAL_MS);
    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
      clearInterval(interval);
    };
  }, [refresh]);

  const login = useCallback(async (username, password) => {
    const current = await apiClient.post('/auth/login', { username, password });
    if (current.token) tokenStore.set(current.token);
    setUser({ id: current.id, username: current.username });
    return current;
  }, []);

  const logout = useCallback(async () => {
    await apiClient.post('/auth/logout').catch(() => {});
    tokenStore.clear();
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
