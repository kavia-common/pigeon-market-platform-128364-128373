import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="header">
      <div className="navbar container">
        <Link to="/" className="brand">
          <span role="img" aria-label="pigeon">🕊️</span>
          Pigeon Market
        </Link>
        <nav className="navlinks">
          <NavLink to="/listings" className="btn secondary">Browse</NavLink>
          <NavLink to="/sell" className="btn">Sell</NavLink>
          <NavLink to="/cart" className="btn">
            Cart {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className="btn secondary">Orders</NavLink>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="btn">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
