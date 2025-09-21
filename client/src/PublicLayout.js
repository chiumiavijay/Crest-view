import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;