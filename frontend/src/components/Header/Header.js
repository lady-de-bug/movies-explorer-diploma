import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import Logo from "../Logo/Logo"
import account from "../../images/profile.svg"
import menu from "../../images/menu-button.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const [isOpened, setIsOpened] = React.useState(false)

  const setActiveLinks = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpen() {
    setIsOpened(true)
  }

  function handleClose() {
    setIsOpened(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <div className="form__logo">
            <Logo />
          </div>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header__white">
          <div className="form__logo">
            <Logo />
          </div>
          <div className="header__button-container header__button-container_films">
            <NavLink to="/movies" className={setActiveLinks}>
              Фильмы
            </NavLink>

            <NavLink to="/saved-movies" className={setActiveLinks}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="изображение кнопки аккаунта"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={menu} alt="меню" />
            </button>
          </div>
          {isOpened ? <Navigation handleClose={handleClose} /> : ""}
        </header>
      )}
    </>
  )
}

export default Header
