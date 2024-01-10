import {useState} from 'react';
import axios from 'axios';
import config from '../config/config';
import useStorage from './storage';
import $api from '../http';

const useAuth = () => {
  const {clearStorage} = useStorage(config.storageName);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(false);

  const login = async (user) => {
    try {
      const response = await $api.post('/api/auth/login', {...user});
      localStorage.setItem(config.storageName, response.data.accessToken);
      setAuthStatus(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  const logout = () => {
    setAuthStatus(false);
    clearStorage();
  }

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/auth/refresh`,
        {withCredentials: true}
      )
      localStorage.setItem(config.storageName, response.data.accessToken);
      setAuthStatus(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return {login, logout, isAuthenticated, checkAuth, user};
};

export default useAuth;
