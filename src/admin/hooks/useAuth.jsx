import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiClient, tokenStore } from '../../lib/apiClient';

const AuthContext = createContext(null);

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

  const login = useCallback(async (username, password) => {
    // eslint-disable-next-line no-console
    console.log('[DEBUG login] credenciales enviadas:', { username, password });
    const current = await apiClient.post('/auth/login', { username, password });
    // eslint-disable-next-line no-console
    console.log('[DEBUG login] respuesta del servidor:', current);
    if (current.token) tokenStore.set(current.token);
    // eslint-disable-next-line no-console
    console.log('[DEBUG login] token guardado en sessionStorage:', tokenStore.get());
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
