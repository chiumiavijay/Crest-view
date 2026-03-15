
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/">
          <img
            src="/images/Logo.png"
            alt="Sweet Crestview Guesthouse & Restaurant Logo"
            className="h-16 w-auto"
          />
        </NavLink>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Simple hamburger icon */}
          <span className="text-2xl">☰</span>
        </button>

        {/* Navigation links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center md:space-x-6 mt-4 md:mt-0 ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          {[
            { path: '/', label: 'Home' },
            { path: '/menu', label: 'Menu' },
            { path: '/guesthouse', label: 'Guesthouse' },
            { path: '/reservations', label: 'Reservations' },
            { path: '/contact', label: 'Contact' },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block py-2 md:py-0 text-lg font-bold transition-colors ${
                  isActive ? 'text-yellow-400' : 'text-white hover:text-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
