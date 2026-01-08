import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Tag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">AI Resources</div>
            <div className="navbar-links">
                {/* <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink> */}
                <NavLink
                    to="/products"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    <ShoppingBag size={20} />
                    <span>Products</span>
                </NavLink>
                <NavLink
                    to="/prices"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    <Tag size={20} />
                    <span>Prices</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
