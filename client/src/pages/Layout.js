import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderWrapper from '../components/header/HeaderWrapper';
import Footer from '../components/Footer';
import TopPanel from '../components/header/TopPanel';
import Navbar from '../components/header/Navbar';

const Layout = () => {

  return (
    <>
      <HeaderWrapper>
        <TopPanel />
        <div className='navigation'>
          <div className='nav-icon' tabIndex='0'>
            <div></div>
          </div>
          <Navbar />
        </div>
      </HeaderWrapper>
      <main className='hp-content'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;