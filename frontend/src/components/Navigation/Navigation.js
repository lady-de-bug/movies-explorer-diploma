import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/profile.svg"
import "./Navigation.css"

function Navigation({ handleClose }) {
  const setActiveLinksColorLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__mobile-menu">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__links">
          <NavLink
            className={setActiveLinksColorLink}
            to="/"
            onClick={handleClose}
          >
            Главная
          </NavLink>
          <NavLink
            className={setActiveLinksColorLink}
            to="/movies"
            onClick={handleClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            className={setActiveLinksColorLink}
            to="/saved-movies"
            onClick={handleClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          to="/profile"
          className="navigation__account-button"
          onClick={handleClose}
        >
          <img src={account} alt="аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
