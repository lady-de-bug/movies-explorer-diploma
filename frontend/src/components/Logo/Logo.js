import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/header-logo.svg'

function Logo() {
  return (
    <Link to="/" className="logo">
      <img className="logo__img" src={logo} alt="Логотип" />
    </Link>
  );
}

export default Logo;
