// LandingPage.jsx
import React from 'react';
import ProductPage from '../components/Product';
import CartIcon from '../components/CartIcon'; 

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Our Amazing Products</h1>
          <CartIcon />
      </header>
      <div className="content">
        <ProductPage />
      </div>
    </div>
  );
}

export default LandingPage;
