import React from 'react';
import './Benefits.css';

const Benefits = () => {
  return (
    <div className="benefits-container">
      <div className="benefit-item">
        <div className="icon-circle">
          <img src="/img/logo/1.webp" alt="Delivery truck" />
        </div>
        <h3 className="benefit-title">14 dni na zwrot</h3>
      </div>
      
      <div className="benefit-item">
        <div className="icon-circle">
          <img src="/img/logo/2.webp" alt="Quality badge" />
        </div>
        <h3 className="benefit-title">Wysoka jakość</h3>
      </div>
      
      <div className="benefit-item">
        <div className="icon-circle">
          <img src="/img/logo/3.webp" alt="Natural products" />
        </div>
        <h3 className="benefit-title">Naturalne produkty</h3>
      </div>
      
      <div className="benefit-item">
        <div className="icon-circle">
          <img src="/img/logo/4.webp" alt="Free shipping" />
        </div>
        <h3 className="benefit-title">Darmowa wysyłka powyżej 300 zł</h3>
      </div>
    </div>
  );
};

export default Benefits;
