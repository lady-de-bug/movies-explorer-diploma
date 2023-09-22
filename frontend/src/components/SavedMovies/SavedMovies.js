import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import { filterMovies, filterMovieDuration } from "../../utils/utils"

function SavedMovies({ loggedIn, savedMovies, onDeleteCard }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isShortFilm, setIsShortFilm] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  //Функция onSearchMovies(query) принимает параметр query,
  // который представляет поисковой запрос, введенный пользователем.
  // Она используется для обновления состояния searchQuery с помощью функции
  // setSearchQuery. Это позволяет сохранить текущий поисковый запрос в состоянии компонента.
  function onSearchMovies(query) {
    setSearchQuery(query)
  }

  //Функция handleShortToggleMovie() не принимает никаких параметров.
  // Она используется для обработки переключения состояния isShortFilm.
  // Каждый раз, когда функция вызывается, она инвертирует текущее значение
  // isShortFilm, используя оператор отрицания !. То есть, если isShortFilm
  // было true, оно станет false, и наоборот.
  function handleShortToggleMovie() {
    setIsShortFilm(!isShortFilm)
  }

  //useEffect срабатывает при изменении состояний savedMovies, isShortFilm
  // или searchQuery. Он выполняет следующие действия:
  // Фильтрует список фильмов savedMovies на основе текущего поискового запроса searchQuery с помощью функции filterMovies.
  // Если флаг isShortFilm установлен в true, применяет также фильтр по длительности фильмов с помощью функции filterMovieDuration.
  // Обновляет состояние filteredMovies с отфильтрованным списком фильмов.
  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortFilm ? filterMovieDuration(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortFilm, searchQuery])

  // useEffect срабатывает при изменении состояния filteredMovies.
  // Он проверяет длину списка отфильтрованных фильмов filteredMovies
  // и обновляет состояние isNotFound в зависимости от того, является
  // ли список пустым или нет. Если список пустой, то isNotFound
  // устанавливается в true, в противном случае - в false
  useEffect(() => {
    setIsNotFound(filteredMovies.length === 0)
  }, [filteredMovies])

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <Header loggedIn={loggedIn} />
        <SearchForm
          onSearchMovies={onSearchMovies}
          onFilterMovies={handleShortToggleMovie}
        />
        <MoviesCardList
          isNotFound={isNotFound}
          isSavedFilms={true}
          cards={filteredMovies}
          savedMovies={savedMovies}
          onDeleteCard={onDeleteCard}
        />
      </div>

      <Footer />
    </main>
  )
}

export default SavedMovies
