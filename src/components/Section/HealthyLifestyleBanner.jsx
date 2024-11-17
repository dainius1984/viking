import React from 'react';
import './HealthyLifestyleBanner.css';

const HealthyLifestyleBanner = () => {
  return (
    <div className="banner-section">
      <div className="banner-content">
        <div className="banner-frame">
          <img 
            src="/img/banner.webp" 
            alt="Omega-3 Supplements" 
            className="frame-image"
          />
        </div>
        <div className="banner-heading">
          <h2>Uczyń zdrowy tryb życia</h2>
          <h2>swoim nawykiem!</h2>
        </div>
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;