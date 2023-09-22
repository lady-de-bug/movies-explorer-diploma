import React from "react"
import "./MoviesCard.css"
import { durationMovieConverter } from "../../utils/utils"

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function onDelete() {
    onDeleteCard(card)
  }

  const cardLikeButtonClassName = `${
    saved
      ? "movies-card__button movies-card__button_active"
      : "movies-card__button"
  }`

  return (
    <>
      <article className="movies-card" key={card.id}>
        {/*  <img className="movies-card__image" src={movie} alt="Изображение фильма" />  */}

        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movies-card__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>

        <div className="movies-card__mask-group">
          <div className="movies-card__caption">
            <h2 className="movies-card__name">{card.nameRU}</h2>
            <p className="movies-card__duration">
              {durationMovieConverter(card.duration)}
            </p>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="movies-card__button movies-card__button_type_delete"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </article>
    </>
  )
}

export default MoviesCard
