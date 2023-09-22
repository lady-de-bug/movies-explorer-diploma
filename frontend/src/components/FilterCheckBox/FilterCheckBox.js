import React from "react"
import "./FilterCheckBox.css"

function FilterCheckBox({ onFilterMovies, isShortFilm }) {
  return (
    <form className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__invisible"
          type="checkbox"
          onChange={onFilterMovies}
          checked={isShortFilm}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__description">Короткометражки</p>
    </form>
  )
}

export default FilterCheckBox
