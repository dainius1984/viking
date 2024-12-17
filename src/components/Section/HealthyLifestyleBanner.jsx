import React from 'react';
import { Link } from 'react-router-dom';
import './HealthyLifestyleBanner.css';

const HealthyLifestyleBanner = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="banner-section">
        <div className="banner-content">
          <Link to="/category" className="banner-frame" onClick={handleClick}>
            <img 
              src="/img/banner.jpg" 
              alt="Naturalne suplementy" 
              className="frame-image"
            />
          </Link>
          <div className="banner-heading">
            <h2>Uczyń zdrowy</h2>
            <h2 className="main-text">tryb życia</h2>
            <h2 className="emphasis">swoim nawykiem!</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthyLifestyleBanner;