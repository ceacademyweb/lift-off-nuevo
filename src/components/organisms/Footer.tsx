import React from 'react';
import Social from "../molecules/Social";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="main-footer__container">
        <div className="main-footer__data">
          <img src={`/img/logo.svg`} alt="Logo" className="main-footer__logo" />
          <Social />
        </div>
        <div className="sponsors"></div>
        <div className="newsletter">
          <div className="newsletter__header">
            <h3>Suscríbete a nuestro newsletter</h3>
          </div>
          <form action="#" className="newsletter__form">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Escribe tu email"
            />
            <button type="submit" className="btn btn-dark btn-small">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
      <div className="bottom-bar">
        <a href="/privacidad">Aviso de Privacidad</a>
      </div>
    </footer>
  );
};

export default Footer;
