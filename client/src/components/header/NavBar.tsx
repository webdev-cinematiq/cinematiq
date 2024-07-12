import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiSearch, CiBullhorn, CiUser, CiSquarePlus } from 'react-icons/ci';
import './NavBar.css';

export default function NavBar() {
  const { pathname } = useLocation();
  const links = [
    { label: '', path: '/search', icon: <CiSearch className="icon" /> }, // search
    { label: 'FILMS', path: '/films', icon: null },
    { label: 'TV', path: '/tv', icon: null },
    { label: 'COLLECTIONS', path: '/collections', icon: null },
    { label: 'DISCUSSIONS', path: '/discussions', icon: null },
    { label: '', path: '/news', icon: <CiBullhorn className="icon" /> }, // news
    { label: '', path: '/profile', icon: <CiUser className="icon" /> }, // profile
    // { label: 'LOGIN', path: '/login', icon: null },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/path/to/logo.png" alt="Cinematiq" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link ${
                    pathname === link.path ? 'active' : ''
                  }`}
                  to={link.path}
                >
                  {link.icon && <span className="me-2">{link.icon}</span>}
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="btn btn-create" to="/review/create">
                <CiSquarePlus className="icon" /> CREATE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
