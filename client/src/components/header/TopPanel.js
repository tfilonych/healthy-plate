import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import AuthContext from '../../context/AuthContext';

const TopPanel = () => {
  const { logout, isAuthenticated, } = useContext(AuthContext);

  return (
    <div className="top-panel">
      <ThemeSwitcher />
      {!isAuthenticated ?
        <Link className="login-btn" to="/login">Sign In</Link> :
        <Link className="login-btn" to="/" onClick={logout}>Sign Out</Link>
      }
    </div>
  );
}

export default TopPanel;
