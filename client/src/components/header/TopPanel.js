import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useSelector } from 'react-redux';

const TopPanel = () => {
  const accessToken = useSelector(state => state.user.accessToken);

  return (
    <div className='top-panel'>
      <ThemeSwitcher />
      {!accessToken ?
        <Link className='login-btn' to='/login'>Sign In</Link> :
        <Link className='login-btn' to='/'>Sign Out</Link>
      }
    </div>
  );
};

export default TopPanel;
