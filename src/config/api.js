import axios from 'axios';

const LOCALHOST = 'https://leninupdatedbackend.onrender.com';
export const API_BASE_URL = LOCALHOST;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach JWT from localStorage dynamically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt'); // use 'jwt' key
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.get('/auth/refresh'); // refresh using cookie
        if (data?.accessToken) {
          localStorage.setItem('jwt', data.accessToken); // update JWT in localStorage
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Optionally handle logout here
      }
    }

    return Promise.reject(error);
  }
);

export default api;
