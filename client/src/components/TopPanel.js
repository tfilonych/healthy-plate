import React from 'react';
import { Link } from 'react-router-dom';

const TopPanel = ( {auth: {token, logout}} ) => (
  <div className="top-panel">
    {!token ? <div className="login-btn">
      <Link to="/login">Sign In</Link>
    </div> : <div className="login-btn" onClick={logout}>Sign Out</div>
    }
  </div>
);

export default TopPanel;
