import React from 'react';
import ProductPage from '../components/Product';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function LandingPage() {
  return (
    <>
    <Header/>
    <Outlet />
    {/* <Footer /> */}
    </>
    
  );
}

export default LandingPage;
