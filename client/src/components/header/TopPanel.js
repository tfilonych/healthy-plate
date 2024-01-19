import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Logo from './Logo';

const TopPanel = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

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
