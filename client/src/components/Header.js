import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TopPanel from './TopPanel';
import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        console.log(`You changed the page to: ${location.pathname}`);
        if (headerRef.current.contains(document.activeElement)) {
            document.activeElement.blur()
        }
    }, [location]);

  return (
    <div className="header" tabIndex="0" ref={headerRef}>
        <TopPanel isAuthenticated={isAuthenticated} logout={logout} />
        <Logo />
        <div className="navigation">
            <div className="nav-icon" tabIndex="0">
                <div></div>
            </div>
            <Navbar />
        </div>
    </div>
  );
};

export default Header;
