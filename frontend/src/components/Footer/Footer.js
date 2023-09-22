import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info-block">
        <p className="footer__copyright">© 2023</p>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__nav-link" href="https://github.com/lady-de-bug/" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
