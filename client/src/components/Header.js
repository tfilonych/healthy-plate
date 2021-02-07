import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {TopPanel} from './TopPanel';
import {Navbar} from './Navbar2';
import {Logo} from './Logo';

export const Header = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [open, toggleClass] = useState(false)

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  const toggleMenu = () => {
    toggleClass((prev) => !prev);
  }
  return (
    <div className={`header ${open ? 'open' : ''}`}>
      <div className={`nav-icon`} onClick={toggleMenu}>
        <div></div>
      </div>
      <TopPanel />
      <Logo />
      <Navbar />
    </div>
  );
};
