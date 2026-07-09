const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '') + '/api';
const TOKEN_KEY = 'LuckSoft_token';

export const tokenStore = {
  get: () => { try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (token) => { try { sessionStorage.setItem(TOKEN_KEY, token); } catch {} },
  clear: () => { try { sessionStorage.removeItem(TOKEN_KEY); } catch {} },
};

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const isFormData = body instanceof FormData;

  const authHeaders = {};
  const token = tokenStore.get();
  if (token) authHeaders['Authorization'] = `Bearer ${token}`;

  const finalHeaders = isFormData
    ? { ...authHeaders, ...headers }
    : { 'Content-Type': 'application/json', ...authHeaders, ...headers };

  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'include',
    headers: finalHeaders,
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || `Error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload: (path, formData) => request(path, { method: 'POST', body: formData }),
};
