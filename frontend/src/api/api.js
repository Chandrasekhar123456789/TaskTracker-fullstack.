const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export async function fetchTasks(params = {}) {
  const qs = new URLSearchParams(params);
  const res = await fetch(`${BASE}/tasks?${qs.toString()}`);
  return res.json();
}

export async function createTask(payload) {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function patchTask(id, payload) {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchInsights() {
  const res = await fetch(`${BASE}/insights`);
  return res.json();
}
