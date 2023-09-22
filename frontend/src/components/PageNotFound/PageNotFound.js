import React from "react"
import "./PageNotFound.css"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const path = useNavigate()

  function goNavigatePath() {
    path(-3)
  }

  return (
    <main className="error-page">
      <h1 className="error-page__name">404</h1>
      <p className="error-page__description">Страница не найдена</p>
      <button className="error-page__back-link" onClick={goNavigatePath}>
        Назад
      </button>
    </main>
  )
}

export default PageNotFound
