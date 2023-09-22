import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionTitle title="О проекте" />
      {/* <h2 className="about-project__title section-title">О проекте</h2> */}
      <div className="about-project__content">
        <div className="about-project__content-block">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__content-block">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timetable">
        <section  className="about-project__back-duration">
          <p className="about-project__back-duration-text">1 неделя</p>
        </section>
        <div className="about-project__front-duration">
          <p className="about-project__front-duration-text">4 недели</p>
        </div>
        <p className="about-project__text">Back-end</p>
        <p className="about-project__text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
