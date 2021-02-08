import React, { useState } from 'react';
import TopPanel from './TopPanel';
import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
  const [open, toggleClass] = useState(false);

  const toggleMenu = () => {
    toggleClass((prev) => !prev);
  };
  return (
    <div className={`header ${open ? "open" : ""}`}>
      <div className={`nav-icon`} onClick={toggleMenu}>
        <div></div>
      </div>
      <TopPanel />
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
