import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CiSearch,
  CiBullhorn,
  CiUser,
  CiLogin,
} from 'react-icons/ci';
import { MdAdminPanelSettings } from "react-icons/md";
import './NavBar.css';
import CreatePost from '../main/Create/CreatePost';

export default function NavBar() {
  const { pathname } = useLocation();
  const links = [
    { label: '', path: '/search', icon: <CiSearch className="icon" /> },
    { label: 'FILMS', path: '/films', icon: null },
    { label: 'COLLECTIONS', path: '/collections', icon: null },
    { label: '', path: '/news', icon: <CiBullhorn className="icon" /> },
    { label: '', path: '/profile', icon: <CiUser className="icon" /> },
    { label: '', path: '/admin', icon: <MdAdminPanelSettings className="icon" /> },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/cinematiqS.jpg"
            />
            <img src="/images/cinematiq.jpg" alt="Cinematiq" className="logo" />
          </picture>
        </Link>
        <div className="d-flex flex-grow-1 justify-content-end">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link ${pathname === link.path ? 'active' : ''
                    }`}
                  to={link.path}
                >
                  {link.icon && <span className="me-2">{link.icon}</span>}
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="nav-item me-2">
              <CreatePost dialogTitle="Create Post" />
            </li>
            <li>
              <Link className="btn btn-login" to="/login">
                LOGIN <CiLogin className="icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
