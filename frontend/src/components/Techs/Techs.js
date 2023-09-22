import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {
  return (
    <section className="techs" id="techs">
      <SectionTitle title="Технологии" />
      <div className="techs__content">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__tech-list">
          <li className="techs__tech-item">HTML</li>
          <li className="techs__tech-item">CSS</li>
          <li className="techs__tech-item">JS</li>
          <li className="techs__tech-item">React</li>
          <li className="techs__tech-item">Git</li>
          <li className="techs__tech-item">Express.js</li>
          <li className="techs__tech-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
