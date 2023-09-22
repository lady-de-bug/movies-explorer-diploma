import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import "./App.css"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import InfoTooltip from "../InfoToolTip/InfoToolTip"
import InfoTooltipUpdate from "../InfoToolTipUpdate/InfoToolTipUpdate"
import PageNotFound from "../PageNotFound/PageNotFound"
import * as api from "../../utils/MainApi"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const path = location.pathname

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  // регистрация пользователя
  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleAuthorization({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
  }

  // авторизация пользователя
  function handleAuthorization({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        // Если авторизация прошла успешно (без ошибок), выполняем следующие действия
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          // Сохраняем JWT-токен в локальном хранилище
          localStorage.setItem("jwt", res.token)
          // Перенаправляем пользователя на страницу "./movies"
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUserInfo(newUserInfo) {
    setIsLoading(true)
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        // Если обновление прошло успешно (без ошибок), выполняем следующие действия
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true) // Устанавливаем флаг setIsUpdate в значение true
        setCurrentUser(data) // Устанавливаем новую информацию о пользователе
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)

        console.log(err)
        handleUnauthorizedError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLikeCard(card) {
    api
      .createCard(card)
      .then((newMovie) => {
        // Если операция прошла успешно (без ошибок), выполняем следующие действия
        //Обновляем список избранных карточек (savedMovies),
        // добавляя новую карточку newMovie в начало списка с помощью оператора расширения (...).
        setSavedMovies([newMovie, ...savedMovies]) // Добавляем новую карточку в список избранных карточек
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        // Если операция прошла успешно (без ошибок), выполняем следующие действия
        //Обновляем список избранных карточек (savedMovies), фильтруя состояние state
        // и оставляя только те карточки, идентификаторы которых не совпадают
        // с идентификатором удаляемой карточки card._id.
        setSavedMovies((state) => state.filter((item) => item._id !== card._id)) // Удаляем карточку из списка избранных карточек
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  function handleUnauthorizedError(err) {
    // Проверяем, является ли ошибка ошибкой авторизации (401 Unauthorized)
    if (err === "Error: 401") {
      handleSignOut() // Вызываем функцию handleSignOut для выхода из приложения
    }
  }

  //Этот useEffect выполняет проверку наличия токена
  // авторизации в локальном хранилище (localStorage)
  //при монтировании компонента. Если токен найден, выполняется
  // запрос к API с использованием токена для получения контента.
  // Если запрос успешен, удаляется ключ "allMovies" из локального хранилища,
  // и устанавливается флаг isLoggedIn в значение true. Затем происходит
  // перенаправление на указанный путь path.
  // Если происходит ошибка при запросе, она выводится в консоль.
  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Если пользователь авторизован, получаем информацию о профиле пользователя
    //Эта часть кода выполняется только в случае, если пользователь авторизован.
    // Она отвечает за получение информации о профиле пользователя.
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          // Устанавливаем полученные данные о пользователе в состояние
          //Данные о профиле пользователя, полученные из API, сохраняются в
          // состоянии компонента с помощью функции setCurrentUser.
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      // Получаем сохраненные фильмы пользователя
      //Здесь выполняется запрос к API для получения сохраненных фильмов пользователя.
      api
        .getMovies()
        .then((cardsData) => {
          // Обратная сортировка данных фильмов
          //Полученные данные фильмов сортируются в обратном порядке,
          // чтобы последние сохраненные фильмы отображались первыми.
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  const handleSignOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    // Удаляем сохраненные данные фильмов из локального хранилища
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    //localStorage.clear() очищает данные в локальном хранилище
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />

            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onAuthorization={handleAuthorization}
                  />
                )
              }
            />

            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register isLoading={isLoading} onRegister={handleRegister} />
                )
              }
            />

            <Route path={"*"} element={<PageNotFound />} />

            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleDeleteCard}
                  handleLikeFilm={handleLikeCard}
                />
              }
            />

            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleDeleteCard}
                />
              }
            />

            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onUpdateUser={handleUpdateUserInfo}
                  signOut={handleSignOut}
                />
              }
            />
          </Routes>

          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />

          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
