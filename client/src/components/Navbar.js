import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navbarStyle = {
    padding: '1rem',
    background: '#333',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between', // Changed to space-between to position logo and links
    alignItems: 'center', // Added to vertically center items
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  };

  const navLinkStyle = {
    margin: '0 15px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    fontSize: '1.1rem',
  };

  const activeNavLinkStyle = {
    color: '#ffc107',
  };

  const navLinksContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  };

  // New style for the logo image
  const logoImageStyle = {
    height: '60px', // Adjust size as needed
    width: 'auto',
    marginLeft: '20px',
  };

  return (
    <nav style={navbarStyle}>
      {/* Replaced the text div with an img tag for the logo */}
      <NavLink to="/">
        <img
          src="/images/Logo.png"
          alt="Sweet Crestview Guesthouse & Restaurant Logo"
          style={logoImageStyle}
        />
      </NavLink>

      <div style={navLinksContainerStyle}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...navLinkStyle,
            ...(isActive ? activeNavLinkStyle : null),
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          style={({ isActive }) => ({
            ...navLinkStyle,
            ...(isActive ? activeNavLinkStyle : null),
          })}
        >
          Menu
        </NavLink>
        <NavLink
          to="/guesthouse"
          style={({ isActive }) => ({
            ...navLinkStyle,
            ...(isActive ? activeNavLinkStyle : null),
          })}
        >
          Guesthouse
        </NavLink>
        <NavLink
          to="/reservations"
          style={({ isActive }) => ({
            ...navLinkStyle,
            ...(isActive ? activeNavLinkStyle : null),
          })}
        >
          Reservations
        </NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            ...navLinkStyle,
            ...(isActive ? activeNavLinkStyle : null),
          })}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}