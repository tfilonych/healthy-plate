import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const TopPanel = ({  }) => (
  <div className="top-panel">
  <ThemeSwitcher />
    {/*{!isAuthenticated*/}
      <Link className="login-btn" to="/login">Sign In</Link>
      {/*: <Link className="login-btn" to="/" onClick={logout}>Sign Out</Link>*/}
    }
  </div>
);

export default TopPanel;
