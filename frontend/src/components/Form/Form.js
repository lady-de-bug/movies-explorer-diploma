import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import Logo from "../Logo/Logo"

function Form({
  children,
  title,
  buttonText,
  question,
  linkText,
  link,
  onSubmit,
  isDisabled,
  isLoading,
}) {
  return (
    <section className="form">
      <Logo />
      <h1 className="form__title">{title}</h1>
      <form className="form__container" id="form" onSubmit={onSubmit}>
        {children}

        <button
          type="submit"
          disabled={isDisabled ? true : false}
          className={
            isDisabled || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
        >
          {buttonText}
        </button>
      </form>

      <div className="form__choose-area">
        <p className="form__text">{question}</p>
        <Link className="form__link" to={link}>
          {linkText}
        </Link>
      </div>
    </section>
  )
}

export default Form
