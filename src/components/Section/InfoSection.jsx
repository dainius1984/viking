import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InfoSection.css';
import LinkSection from './LinkSection';

const InfoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/category');
    window.scrollTo(0, 0);
  };

  return (
    <div className="info-container">
      <div className="header-section">
        <div className="logo-container">
          <img src="/img/logo.jpg" alt="HealthFamily logo" className="logo" />
        </div>
        <div className="title-container">
          <h1>Suplementy Diety</h1>
          <h2>Health Family</h2>
        </div>
      </div>

      <div className="content-section">
  <p className="text-content">
    Omega-3, witaminy i minerały to kluczowe składniki odżywcze, których braki odczuwamy coraz częściej. W ciągu ostatnich dziesięcioleci jakość żywności uległa znacznemu pogorszeniu – produkty są wysoko przetworzone i pełne sztucznych dodatków. Dodatkowo, coraz częściej stosowane są metody sztucznego zwiększania wagi mięsa, co odbija się na jego wartości odżywczej. W efekcie <strong>nasza codzienna dieta jest uboga w ważne składniki odżywcze</strong>, co prowadzi do wzrostu liczby schorzeń związanych z niedoborem witamin i minerałów.
  </p>

  <p className="text-content">
    Zdrowy styl życia, zbilansowana dieta i odpowiednie suplementy są nieodzowne, by cieszyć się dobrym zdrowiem. Dlatego <strong>Health Family wychodzi naprzeciw wyzwaniom współczesnej diety</strong>, oferując suplementy diety bogate w omega-3, DHA, EPA oraz kluczowe witaminy i minerały, które wspierają Twoje zdrowie na co dzień.
  </p>

  <h3 className="section-title">Dlaczego Health Family?</h3>

  <p className="text-content">
    Tworząc nasze produkty, <strong>inspirowaliśmy się naturą i potrzebami współczesnych rodzin</strong>. Wierzymy, że każdy zasługuje na to, by czerpać z życia pełnymi garściami, bez obaw o niedobory składników odżywczych. Nasze suplementy zostały stworzone z myślą o dostarczeniu Twojemu organizmowi tego, co najlepsze, abyś każdego dnia mógł stawiać czoła nowym wyzwaniom.
  </p>
</div>

<div className="additional-content">
  <h3 className="section-title">Health Family – wsparcie dla każdego</h3>
  <p className="text-content">
    Suplementy diety od Health Family to <strong>idealny wybór dla całej rodziny</strong>. Dbając o zdrowie swoje i swoich bliskich, warto sięgnąć po produkty, które wspierają koncentrację, wzmacniają odporność oraz korzystnie wpływają na serce, mózg i układ krwionośny. Poznaj naszą ofertę i znajdź rozwiązanie idealne dla Ciebie. Health Family to połączenie przystępnej ceny i skuteczności.
  </p>

        <button onClick={handleClick} className="cta-button">
          Zobacz więcej
        </button>
      </div>

      <LinkSection />
    </div>
  );
};

export default InfoSection;