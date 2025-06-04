const API_URL = 'http://localhost:5000/api';

const request = async (endpoint, method = 'GET', body, token) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // Optional: throw error if not ok
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(errMsg);
  }

  return res.json();
};

export default {
  login: (data) => request('/auth/login', 'POST', data),
  getProfile: (token) => request('/auth/profile', 'GET', null, token),
  getEngineers: (token) => request('/engineers', 'GET', null, token),
  getProjects: (token) => request('/projects', 'GET', null, token),
  createAssignment: (data, token) => request('/assignments', 'POST', data, token),
  getAssignments: (token) => request('/assignments', 'GET', null, token),
  createProject: (data, token) => request('/projects', 'POST', data, token),
  updateEngineer: (id, data, token) => request(`/engineers/${id}`, 'PUT', data, token),
};
