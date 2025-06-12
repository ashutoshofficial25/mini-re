// src/lib/axios.ts
import axios from 'axios';
import { toast } from 'sonner';

const baseUrl = window.location.host.includes('localhost')
  ? 'http://localhost:81'
  : 'https://api.examly.one';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set initial token
const token = window.localStorage.getItem('accessToken');
if (token) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Dynamically update token when user logs in
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
    localStorage.removeItem('accessToken');
  }
};

// Interceptor for handling auth errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      toast.error('Session expired. Please log in again.');
      setAuthToken(null);
      // Optionally redirect
      // window.location.href = '/auth/login';
    }
    return Promise.reject(error?.response || error);
  }
);

export default axiosInstance;
