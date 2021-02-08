import React from 'react';
import { Link } from 'react-router-dom';

const TopPanel = () => (
  <div className="top-panel">
    <div className="login-btn">
      <Link to="/login">Sign In</Link>
    </div>
  </div>
);

export default TopPanel;
