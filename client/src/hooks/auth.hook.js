import { useState, useCallback, useEffect } from 'react';
import storageName from '../config/config';
import useToken from './token.hook';
import useStorage from './storage';

const useAuth = () => {
  const { updateStorage, clearStorage } = useStorage(storageName);
  const {
    token,
    isTokenExpired,
    getUpdatedToken,
    removeToken
  } = useToken();
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setAuthStatus] = useState(false);

  const login = (newToken=null) => {
    if (newToken && newToken.accessToken) {
      updateStorage(newToken);
    }
    setAuthStatus(true);
  }

  const logout = useCallback(async() => {
    setAuthStatus(false);
    clearStorage();
    await removeToken()
  }, []);

  const checkAuth = async () => {
    if (token && token.accessToken) {
      const isTokenExp = isTokenExpired();

      if (isTokenExp) {
        const updatedToken = await getUpdatedToken(token);

        return updatedToken && updatedToken.accessToken && login(updatedToken);
      }
      login();
    }
  }

  useEffect(() => {
    checkAuth();

    return () => setReady(true);
  }, [login]);

  return { login, logout, isAuthenticated, ready };
};

export default useAuth;
