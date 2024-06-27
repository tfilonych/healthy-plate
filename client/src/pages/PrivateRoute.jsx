import React from 'react';
import { Navigate } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    !isAuthenticated ? <Navigate to='/login' replace /> : children
  );
};

export default PrivateRoute;
