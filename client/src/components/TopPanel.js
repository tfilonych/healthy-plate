import React from 'react';
import { Link } from 'react-router-dom';

const TopPanel = ({ isAuthenticated, logout }) => (
  <div className="top-panel">
    {!isAuthenticated
      ? <Link className="login-btn" to="/login">Sign In</Link>
      : <Link className="login-btn" to="/" onClick={logout}>Sign Out</Link>
    }
  </div>
);

export default TopPanel;
