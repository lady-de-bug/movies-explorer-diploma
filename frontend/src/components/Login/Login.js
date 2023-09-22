import React from "react"
import "./Login.css"
import Form from "../Form/Form"
import useForm from "../hooks/useForm"
import { EMAIL_PATTERN } from "../../utils/constants"

function Login({ onAuthorization, isLoading }) {
  // Использование хука useForm()
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()
  // Обработчик отправки формы
  function handleFormSubmit(event) {
    event.preventDefault()
    // Вызов функции onAuthorization с данными введенных значений формы
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <main>
      <Form
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        question="Ещё не зарегистрированы?"
        linkText="Регистрация"
        link="/signup"
        onSubmit={handleFormSubmit}
        isDisabled={!isFormValid}
        isLoading={isLoading}
        noValidate
      >
        <label className="form__label">
          E-mail
          <input
            className="form__input form__input_type_email"
            type="email"
            name="email"
            placeholder="usebudet@horosho.ru"
            onChange={handleChangeInput}
            pattern={EMAIL_PATTERN}
            value={enteredValues.email || ""}
            required
          />
          <span className="form__error">{errors.email}</span>
        </label>
        <label className="form__label">
          Пароль
          <input
            className="form__input form__input_type_password"
            required
            name="password"
            type="password"
            placeholder="••••••••••••••"
            minLength="8"
            maxLength="30"
            onChange={handleChangeInput}
            value={enteredValues.password || ""}
          />
          <span className="form__error">{errors.password}</span>
        </label>
      </Form>
    </main>
  )
}

export default Login
