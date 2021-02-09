import React, { useContext, useState } from 'react';
import TopPanel from './TopPanel';
import Logo from './Logo';
import Navbar from './Navbar';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [open, toggleClass] = useState(false);
  const auth = useContext(AuthContext);

  const toggleMenu = () => {
    toggleClass((prev) => !prev);
  };
  return (
    <div className={`header ${open ? "open" : ""}`}>
      <div className={`nav-icon`} onClick={toggleMenu}>
        <div></div>
      </div>
      <TopPanel auth={auth} />
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
