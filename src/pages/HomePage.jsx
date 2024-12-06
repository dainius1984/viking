// src/pages/HomePage.jsx
import React from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import Header from '../components/Headers/Header';
import HeroSection from '../components/Section/HeroSection';
import HealthyLifestyleBanner from '../components/Section/HealthyLifestyleBanner';
import ProductGrid from '../components/Section/ProductGrid';
import Benefits from '../components/Section/Benefits';
import InfoSection from '../components/Section/InfoSection';
import PreFooter from '../components/Footer/PreFooter';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div>
      <TopNavBar />
      <Header />
      <HeroSection />
      <HealthyLifestyleBanner />
      <ProductGrid />
      <Benefits />
      <InfoSection />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default HomePage;
