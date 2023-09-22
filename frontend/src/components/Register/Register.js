import React from "react"
import "./Register.css"
import Form from "../Form/Form"
import "../Form/Form.css"
import useForm from "../hooks/useForm"
import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../utils/constants"

function Register({ onRegister, isLoading }) {
  // Использует хук useForm для управления состоянием формы.
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  // При отправке формы вызывается функция onRegister,
  // передавая в нее введенные пользователем данные.
  function handleFormSubmit(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <main>
      <Form
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        question="Уже зарегистрированы?"
        linkText="Войти"
        link="/signin"
        onSubmit={handleFormSubmit}
        isDisabled={!isFormValid}
        isLoading={isLoading}
      >
        <label className="form__label">
          Имя
          <input
            className="form__input form__input_type_name"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            placeholder="имя"
            onChange={handleChangeInput}
            value={enteredValues.name || ""}
            pattern={USERNAME_PATTERN}
            required
          />
          <span className="form__error">{errors.name}</span>
        </label>

        <label className="form__label">
          E-mail
          <input
            className="form__input form__input_type_email"
            type="email"
            name="email"
            placeholder="почта"
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

export default Register
