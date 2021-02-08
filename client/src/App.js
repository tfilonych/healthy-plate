import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import AuthContext from "./context/AuthContext";
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  console.log("isAuthenticated ", isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
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
