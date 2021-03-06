import { useState, useCallback, useEffect } from 'react';
import { storageName } from '../../config/config';
import useToken from './token.hook';
import useStorage from './storage.hook';

const useAuth = () => {
  const { updateStorage, clearStorage } = useStorage(storageName);
  const {
    token,
    isTokenExpired,
    getUpdatedToken
  } = useToken();
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setAuthStatus] = useState(false);

  const login = useCallback((newToken=null) => {
    if (newToken && newToken.accessToken) {
      updateStorage(newToken);
    }
    setAuthStatus(true);
  }, []);

  const logout = useCallback(() => {
    setAuthStatus(false);
    clearStorage();
  }, []);

  const checkAuth = async () => {
    if (token && token.accessToken) {
      const isTokenExp = await isTokenExpired();

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
