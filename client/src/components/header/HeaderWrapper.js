import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HeaderWrapper = ({children}) => {
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        console.log(`You changed the page to: ${location.pathname}`);
        if (headerRef.current.contains(document.activeElement)) {
            document.activeElement.blur()
        }
    }, [location]);

  return (
    <header tabIndex="0" ref={headerRef}>
        {children}
    </header>
  );
};

export default HeaderWrapper;
