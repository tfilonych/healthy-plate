import { useEffect, useState } from 'react';
import config from '../config/config';
import useStorage from './storage';
import $api from '../http';

const useAuth = () => {
  const { clearStorage } = useStorage(config.storageName);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (localStorage.getItem(config.storageName)) {
        await checkAuth();
      }
    };

    initializeAuth();
  }, []);

  const handleAuthentication = async (response, action) => {
    localStorage.setItem(config.storageName, response.data.accessToken);
    setAuthStatus(true);
    setUser(response.data.user);
    action && action();
  };

  const handleApiError = (e) => {
    throw e.response?.data?.message;
  };

  const login = async (user) => {
    try {
      const response = await $api.post('/api/auth/login', { ...user });
      await handleAuthentication(response);
    } catch (e) {
      handleApiError(e);
    }
  };

  const logout = () => {
    setAuthStatus(false);
    clearStorage();
  };

  const checkAuth = async () => {
    try {
      const response = await $api.get(
        `/api/auth/refresh`,
        { withCredentials: true }
      );
      await handleAuthentication(response);
    } catch (e) {
      handleApiError(e);
    }
  };

  const register = async (user) => {
    try {
      await $api.post('/api/auth/register', { ...user });
    } catch (e) {
      handleApiError(e);
    }
  };

  return { login, logout, checkAuth, isAuthenticated, user, register };
};

export default useAuth;
