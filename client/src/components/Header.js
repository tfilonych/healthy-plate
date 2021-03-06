import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TopPanel from './TopPanel';
import Logo from './Logo';
import Navbar from './Navbar';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [open, toggleClass] = useState(false);
  const [transition, addTransition] = useState(false);
  const {isAuthenticated, logout} = useContext(AuthContext);
  const history = useHistory()

  useEffect(() => {
    history && history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      toggleMenu(false);
    })
  },[history])

  const toggleMenu = (val) => {
    addTransition(val);
    toggleClass((prev) => !prev);
  };
  return (
    <div className={`header ${open ? "open" : "" } ${transition ? "transition" : "" }`}>
      <div className={`nav-icon`} onClick={() => toggleMenu(true)}>
        <div></div>
      </div>
      <TopPanel isAuthenticated={isAuthenticated} logout={logout} />
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
