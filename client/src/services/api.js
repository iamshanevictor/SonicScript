import { apiUrl } from './config.js';

export async function uploadAudio(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(apiUrl('/api/upload'), {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    let msg = 'Upload failed';
    try { const err = await res.json(); msg = err.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function cutSegment(filename, start, end) {
  const res = await fetch(apiUrl('/api/cut'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, start, end })
  });
  if (!res.ok) {
    let msg = 'Cut failed';
    try { const err = await res.json(); msg = err.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
