import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import useAuthContext from '../../hooks/useAuthContext';

const TopPanel = () => {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <div className='top-panel'>
      <Logo />
      {!isAuthenticated ?
        <Link className='login-btn' to='/login'>Sign In</Link> :
        <Link className='login-btn' to='/' onClick={logout}>Sign Out</Link>
      }
    </div>
  );
};

export default TopPanel;
