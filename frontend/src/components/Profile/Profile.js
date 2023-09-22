import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import "./Profile.css"
import Header from "../Header/Header"
import useForm from "../hooks/useForm"
import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../utils/constants"

function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  // Получение текущего контекста
  const currentUser = useContext(CurrentUserContext)

  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  // Состояние для отслеживания изменений в значениях полей формы
  const [isLastValues, setIsLastValues] = useState(false)

  // Сброс формы при обновлении текущего пользователя
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  // Обработка отправки формы
  function handleFormSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  // Проверка, являются ли текущие значения полей формы последними сохраненными значениями
  useEffect(() => {
    setIsLastValues(
      currentUser.name === enteredValues.name &&
        currentUser.email === enteredValues.email
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])
  return (
    <main>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          className="profile__form"
          id="form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              pattern={USERNAME_PATTERN}
              required
            />
            {/*  <span className="profile__input-error">{errors.name}</span>  */}
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name="email"
              placeholder="почта"
              onChange={handleChangeInput}
              pattern={EMAIL_PATTERN}
              value={enteredValues.email || ""}
              required
            />
            {/*     <span className="profile__input-error">{errors.email}</span>  */}
          </label>

          <div className="profile__submit-area">
            <button
              type="submit"
              disabled={!isFormValid ? true : false}
              className={
                !isFormValid || isLoading || isLastValues
                  ? "profile__button-save form__button-save_inactive"
                  : "profile__button-save"
              }
            >
              Редактировать
            </button>

            <button
              className="profile__button-exit"
              type="button"
              onClick={signOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile
