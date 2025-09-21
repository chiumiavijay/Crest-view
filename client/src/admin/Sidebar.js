import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaList,
  FaCalendarAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaHome className="nav-link-icon" /> },
    { name: 'Add Product', path: '/admin/add-product', icon: <FaPlus className="nav-link-icon" /> },
    { name: 'Add Room', path: '/admin/add-room', icon: <FaPlus className="nav-link-icon" /> },
    { name: 'List Products', path: '/admin/list-products', icon: <FaList className="nav-link-icon" /> },
    { name: 'List Rooms', path: '/admin/list-rooms', icon: <FaList className="nav-link-icon" /> },
    { name: 'Reservations', path: '/admin/reservations', icon: <FaCalendarAlt className="nav-link-icon" /> },
  ];

  const getNavLinkClass = (path) => {
    return `nav-link ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        Sweet Crestview
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={getNavLinkClass(item.path)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* Logout link */}
      <Link
        to="/admin/logout"
        className={`nav-link logout-link`}
      >
        <FaSignOutAlt className="nav-link-icon" />
        <span>Logout</span>
      </Link>
    </div>
  );
}