import React from 'react';
import { Link, NavLink } from "react-router-dom";

function ThankYouPage() {
  return (
    <div className="small-container cart-page">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. We appreciate your business.</p>
      <Link to="/">&rarr; Browse more product and buy more &larr;</Link>
    </div>
  );
}

export default ThankYouPage;
