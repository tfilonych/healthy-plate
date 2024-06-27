import React, { createContext } from 'react';
import useAuth from '../hooks/auth.hook';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { login, logout, register, isAuthenticated } = useAuth();
  const contextValue = {
    login,
    logout,
    register,
    isAuthenticated
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;