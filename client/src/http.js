import axios from 'axios';
import conf from './config/config';

const $api = axios.create({
  withCredentials: true,
  baseURL: (typeof window !== 'undefined') ? location.host : conf.BASE_URL
});

$api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Set headers only when the call is from the client side
    config.headers.Authorization = `Bearer ${localStorage.getItem(conf.storageName)}`;
  }
  return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${conf.BASE_URL}/auth/refresh`, { withCredentials: true });
      localStorage && localStorage.setItem(`${conf.storageName}`, response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('User is not authorized');
    }
  }
  throw error;
});

export default $api;