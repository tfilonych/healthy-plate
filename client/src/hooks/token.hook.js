import { useEffect, useState } from 'react';
import storageName from '../config/config';
import { useHttp } from './http.hook';
import useStorage from './storage';

const useToken = () => {
  const { storageVal=null } = useStorage(storageName);
  const [ token, setToken ] = useState(storageVal);
  const { request } = useHttp();

  const getExpirationDate = () => {
    try {
      const tokenHeader = JSON.parse(atob(token.accessToken.split('.')[1]));

      return tokenHeader && tokenHeader.exp && tokenHeader.exp * 1000 || null;
    } catch (e) {
      console.warn(e.message);
      return null;
    }
  };

  const isTokenExpired = () => {
    return Date.now() > getExpirationDate();
  };

  const getUpdatedToken = async (token) => {
    try {
      return await request('/api/auth/token', 'POST', { token });
    } catch (e) {
      console.warn(e.message);
    }
  }

  const removeToken = async () => {
    try {
      return await request('/api/auth/logout', 'POST');
    } catch (e) {
      console.warn(e.message);
    }
  }

  useEffect(() => {
    setToken(storageVal);
  }, [storageVal]);

  return {
    token,
    isTokenExpired,
    getUpdatedToken,
    removeToken
  }
}

export default useToken;