// src/components/HeroSection.jsx
import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div 
      className="hero-section" 
      style={{ backgroundImage: `url('/img/main.webp')` }}
    >
      <div className="hero-content">
        <h1>Wegański Suplement Diety</h1>
        <p>Wzmocnij zdrowie dzięki naturze!</p>
        <Link to="/category" className="hero-button">Zobacz Produkty</Link>
      </div>
    </div>
  );
};

export default HeroSection;

