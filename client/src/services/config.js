export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const apiUrl = (path) => {
  if (!path) return API_BASE;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};
