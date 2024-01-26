import { useEffect, useState } from 'react';
import config from '../config/config';
import useStorage from './storage';
import $api from '../http';

const useAuth = () => {
  const { clearStorage } = useStorage(config.storageName);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(false);

  useEffect(async () => {
    if (localStorage.getItem(config.storageName)) {
      await checkAuth();
    }
  }, []);

  const login = async (user) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await $api.post('/api/auth/login', { ...user });
      localStorage.setItem(config.storageName, response.data.accessToken);
      setAuthStatus(true);
      setUser(response.data.user);
    } catch (e) {
      throw(e.response?.data?.message);
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
      localStorage.setItem(config.storageName, response.data.accessToken);
      setAuthStatus(true);
      setUser(response.data.user);
    } catch (e) {
      throw(e.response?.data?.message);
    }
  };

  const register = async (user) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await $api.post('/api/auth/register', { ...user });
    } catch (e) {
      throw(e.response?.data?.message);
    }
  };

  return { login, logout, checkAuth, isAuthenticated, user, register };
};

export default useAuth;
