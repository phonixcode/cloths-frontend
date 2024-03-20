import React from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";

function Header() {
    const { items } = useSelector((state) => state.cart);

    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <nav>
                        <ul id="MenuItems">
                            <li>
                                <Link to="/">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart <span>({items.length})</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;
