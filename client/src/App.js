import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useRoutes from './routes';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/auth.hook';
import useToken from './hooks/token.hook';

const App = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const { token } = useToken();
  console.log('isAuthenticated ', isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
        <RouterProvider router={routes} />
    </AuthContext.Provider>
  );
}

export default App;
