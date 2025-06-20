const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://task-manager-api-a2n0.onrender.com';

const handleResponse = async (res) => {
  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const errorText = contentType && contentType.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text();
    throw new Error(`API Error: ${res.status} ${res.statusText}\n${errorText}`);
  }

  if (res.status === 204) return null;

  return res.json();
};

export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  return handleResponse(res);
};

export const fetchTask = async (id) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`);
  return handleResponse(res);
};

export const addTask = async (task) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(res);
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(res);
};
