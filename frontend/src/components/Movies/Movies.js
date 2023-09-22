import React, { useState, useEffect } from "react"
import "./Movies.css"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import { filterMovies, filterMovieDuration } from "../../utils/utils"
import * as movies from "../../utils/MoviesApi"
import Footer from "../Footer/Footer"

function Movies({ loggedIn, handleLikeFilm, onDeleteCard, savedMovies }) {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortFilm, setIsShortFilm] = useState(false)
  const [isReqError, setIsReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  function handleEditFilterMovies(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(
      short ? filterMovieDuration(moviesCardList) : moviesCardList
    )
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  function handleShortToggleMovie() {
    setIsShortFilm(!isShortFilm)
    if (!isShortFilm) {
      const filteredCardsMovies = filterMovieDuration(initialCardsMovies)
      setFilteredMovies(filteredCardsMovies)
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortFilm)
  }

  function onSearchMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortFilm)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleEditFilterMovies(movies, query, isShortFilm)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          handleEditFilterMovies(cardsData, query, isShortFilm)
          setIsReqError(false)
          console.log(cardsData)
        })
        .catch((err) => {
          setIsReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    setIsShortFilm(localStorage.getItem("shortMovies") === "true")
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterMovieDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <main className="movies-main">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilterMovies={handleShortToggleMovie}
        isShortFilm={isShortFilm}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
      />
      <Footer />
    </main>
  )
}

export default Movies
