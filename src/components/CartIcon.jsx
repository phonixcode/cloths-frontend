import React from 'react';
import { Link, NavLink } from "react-router-dom";

function CartIcon() {
  return (
    <Link to="/cart">
        <div className="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 4h-1V2h-2v2H7V2H5v2H4c-1.11 0-1.99.9-1.99 2L2 20c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 6h10v2H7V6zm10 12H7v-5h10v5zm2-7c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v2z"/>
            </svg>
        </div>
    </Link>
  );
}

export default CartIcon;
