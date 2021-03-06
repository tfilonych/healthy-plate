import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from './routes';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/auth.hook';
import useToken from './hooks/token.hook';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <Router>
        <Header />
        <div className="hp-content">{routes}</div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
