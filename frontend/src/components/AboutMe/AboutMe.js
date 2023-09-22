import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/photo.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionTitle title="Студент" />
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Елена</h3>
          <p className="about-me__occupation">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/lady-de-bug"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фотография студента"
        />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
