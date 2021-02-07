import React, { useState } from 'react';
import {TopPanel} from './TopPanel';
import {Navbar} from './Navbar2';
import {Logo} from './Logo';

export const Header = () => {
  const [open, toggleClass] = useState(false)

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
