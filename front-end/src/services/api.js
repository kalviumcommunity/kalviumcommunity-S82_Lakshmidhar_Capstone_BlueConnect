import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update this to your production URL when ready

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (loginData) => api.post('/auth/login', loginData),
  getMe: () => api.get('/auth/me'),
};

export const workerService = {
  getWorkers: (params) => api.get('/workers', { params }),
  getWorker: (id) => api.get(`/workers/${id}`),
  updateProfile: (profileData) => api.put('/workers/me', profileData),
};

export const jobService = {
  createJob: (jobData) => api.post('/jobs', jobData),
  getJobs: () => api.get('/jobs'),
  getMyRequests: () => api.get('/jobs/my-requests'),
  acceptJob: (jobId) => api.put(`/jobs/${jobId}/accept`),
  completeJob: (jobId) => api.put(`/jobs/${jobId}/complete`),
};

export default api;
