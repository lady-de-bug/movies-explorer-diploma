import React, { useState, useEffect } from "react"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox"
import { useLocation } from "react-router-dom"

function SearchForm({ onSearchMovies, onFilterMovies, isShortFilm }) {
 
  const [isQueryError, setIsQueryError] = useState(false)
  const [query, setQuery] = useState("")

  const location = useLocation()

  // Функция handleChangeInputQuery вызывается при изменении значения в поле ввода и обновляет
  // состояние query с новым значением.
  function handleChangeInputQuery(e) {
    setQuery(e.target.value)
  }

  // Функция handleFormSubmit вызывается при отправке формы. Она проверяет, что введенный запрос не пустой, и вызывает функцию
  // onSearchMovies с передачей запроса в качестве аргумента. Если запрос пустой, устанавливается состояние isQueryError в true.
  function handleFormSubmit(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      onSearchMovies(query)
    }
  }

  // В блоке useEffect происходит проверка текущего пути URL и наличия
  // сохраненного запроса в localStorage. Если путь соответствует "/movies"
  // и в localStorage есть значение "movieSearch", оно извлекается и устанавливается в состояние query.
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <section className="search-form">
      <form className="search-form__form" id="form" onSubmit={handleFormSubmit}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleChangeInputQuery}
          value={query || ""}
          type="text"
        />

        <button className="search-form__button-save" type="submit" />
      </form>
      <FilterCheckbox
        onFilterMovies={onFilterMovies}
        isShortFilm={isShortFilm}
      />

      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
    </section>
  )
}

export default SearchForm
