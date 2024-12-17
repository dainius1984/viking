import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoSection.css';
import LinkSection from './LinkSection';
import { FaLeaf, FaHeart, FaTruck, FaUndo } from 'react-icons/fa';

const InfoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/category');
    window.scrollTo(0, 0);
  };

  const features = [
    {
      icon: <FaLeaf />,
      title: "Naturalne składniki",
      description: "Inspirowane naturą, tworzone z myślą o Twoim zdrowiu"
    },
    {
      icon: <FaHeart />,
      title: "Wysoka jakość",
      description: "Starannie wyselekcjonowane składniki i kontrola jakości"
    },
    {
      icon: <FaTruck />,
      title: "Darmowa wysyłka powyżej 300 zł",
      description: "Bezpłatna dostawa dla większych zamówień"
    },
    {
      icon: <FaUndo />,
      title: "14 dni na zwrot",
      description: "Gwarancja satysfakcji z zakupu"
    }
  ];

  return (
    <div className="info-container">
      <div className="header-section">
        <div className="logo-container">
          <img src="/img/logo.jpg" alt="Family Balance logo" className="logo" />
        </div>
        <div className="title-container">
          <h1>Suplementy Diety</h1>
          <h2>Family Balance</h2>
        </div>
      </div>

      <div className="content-section">
        <p className="text-content">
          Omega-3, witaminy i minerały to kluczowe składniki odżywcze, których braki odczuwamy coraz częściej. W ciągu ostatnich dziesięcioleci jakość żywności uległa znacznemu pogorszeniu – produkty są wysoko przetworzone i pełne sztucznych dodatków. Dodatkowo, coraz częściej stosowane są metody sztucznego zwiększania wagi mięsa, co odbija się na jego wartości odżywczej. W efekcie <strong>nasza codzienna dieta jest uboga w ważne składniki odżywcze</strong>.
        </p>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-content">
        <h3 className="section-title">Health Family – wsparcie dla każdego</h3>
        <p className="text-content">
          Suplementy diety od Health Family to <strong>idealny wybór dla całej rodziny</strong>. Dbając o zdrowie swoje i swoich bliskich, warto sięgnąć po produkty, które wspierają koncentrację, wzmacniają odporność oraz korzystnie wpływają na serce, mózg i układ krwionośny.
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