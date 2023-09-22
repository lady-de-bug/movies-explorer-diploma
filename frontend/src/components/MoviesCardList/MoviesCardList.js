import React, { useEffect, useState } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import {
  DESKTOP_DISPLAY_LIMIT,
  TABLET_DISPLAY_LIMIT,
  MOBILE_DISPLAY_LIMIT,
} from "../../utils/constants"
import SearchError from "../SearchError/SearchError"
import Preloader from "../Preloader/Preloader"
import { useLocation } from "react-router-dom"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  // Определяет количество отображаемых карточек в зависимости от размера экрана
  function showCounterMovie() {
    const display = window.innerWidth
    if (display > 1279) {
      setShownMovies(16) // 16
    } else if (display > 767) {
      setShownMovies(8) // 8
    } else {
      setShownMovies(5) // 5
    }
  }

  useEffect(() => {
    showCounterMovie()
  }, [cards])

  // Увеличивает количество отображаемых карточек при нажатии на кнопку "Ещё"
  function showPlayMovieButton() {
    const display = window.innerWidth
    if (display > 1278) {
      setShownMovies(shownMovies + DESKTOP_DISPLAY_LIMIT) // 4
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_DISPLAY_LIMIT) // 2
    } else {
      setShownMovies(shownMovies + MOBILE_DISPLAY_LIMIT) // 2
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showCounterMovie)
    }, 500)
  })

  // Возвращает сохраненную карточку фильма из массива сохраненных фильмов
  function getSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }
  return (
    <>
      <section className="movies">
        {isLoading && <Preloader />}
        {isNotFound && !isLoading && (
          <SearchError errorText={"Ничего не найдено"} />
        )}
        {isReqError && !isLoading && (
          <SearchError
            errorText={
              "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            }
          />
        )}
        {!isLoading && !isReqError && !isNotFound && (
          <>
            {pathname === "/saved-movies" ? (
              <>
                <ul className="movies__list">
                  {cards.map((card) => (
                    <MoviesCard
                      key={isSavedFilms ? card._id : card.id}
                      saved={getSavedMovie(savedMovies, card)}
                      cards={cards}
                      card={card}
                      isSavedFilms={isSavedFilms}
                      handleLikeFilm={handleLikeFilm}
                      onDeleteCard={onDeleteCard}
                      savedMovies={savedMovies}
                    />
                  ))}
                </ul>
                <div className="movies__button-container"></div>
              </>
            ) : (
              <>
                <ul className="movies__list">
                  {cards.slice(0, shownMovies).map((card) => (
                    <MoviesCard
                      key={isSavedFilms ? card._id : card.id}
                      saved={getSavedMovie(savedMovies, card)}
                      cards={cards}
                      card={card}
                      isSavedFilms={isSavedFilms}
                      handleLikeFilm={handleLikeFilm}
                      onDeleteCard={onDeleteCard}
                      savedMovies={savedMovies}
                    />
                  ))}
                </ul>
                <div className="movies__button-container">
                  {cards.length > shownMovies ? (
                    <button
                      className="movies__button"
                      onClick={showPlayMovieButton}
                    >
                      Ещё
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default MoviesCardList
