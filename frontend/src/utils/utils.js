import { MAX_MOVIES_DURATION } from "./constants"

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
}

//Эта функция durationMovieConverter принимает значение длительности duration
// в минутах и конвертирует его в формат "часы:минуты".
export function durationMovieConverter(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

//Функция filterMovies предназначена для фильтрации массива фильмов (movies) по заданному запросу (query).
// Она возвращает новый массив фильмов, который содержит только те фильмы, у которых
// название на русском (nameRU) или название на английском (nameEN) содержит
// подстроку, соответствующую заданному запросу.
export function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}

//Эта функция filterMovieDuration принимает массив фильмов movies и выполняет фильтрацию по длительности фильмов.
// Она возвращает новый массив, содержащий только те фильмы, у которых длительность (duration) меньше значения MAX_MOVIES_DURATION.
//Функция filter применяется к каждому элементу массива movies и проверяет,
// является ли длительность фильма меньше значения MAX_MOVIES_DURATION. Если условие
// выполняется (длительность меньше MAX_MOVIES_DURATION), фильм добавляется в новый массив.
// В результате возвращается отфильтрованный массив фильмов с длительностью меньше MAX_MOVIES_DURATION.
export function filterMovieDuration(movies) {
  return movies.filter((movie) => movie.duration < MAX_MOVIES_DURATION)
}
