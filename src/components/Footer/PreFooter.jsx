import React from 'react';
import './PreFooter.css';

const PreFooterNav = () => {
  return (
    <nav className="pre-footer-nav">
      <div className="nav-container">
        <div className="nav-group">
          <h4>Informacje</h4>
          <ul>
            <li><a href="/o-nas">O nas</a></li>
            <li><a href="/regulamin">Regulamin</a></li>
            <li><a href="/polityka-prywatnosci">Polityka prywatności</a></li>
            <li><a href="/dostawa">Dostawa</a></li>
            <li><a href="/zwroty">Zwroty</a></li>
          </ul>
        </div>
        <div className="nav-group">
          <h4>Nasze produkty</h4>
          <ul>
            <li><a href="/nowosci">Nowości</a></li>
            <li><a href="/bestsellery">Bestsellery</a></li>
            <li><a href="/promocje">Promocje</a></li>
            <li><a href="/zestawy">Zestawy</a></li>
          </ul>
        </div>
        <div className="nav-group">
          <h4>Kontakt</h4>
          <ul>
            <li><a href="/pomoc">Pomoc</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PreFooterNav;
