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

const products = [
  {
    id: 1,
    name: 'Ekstrakt z pestek winogron 95% OPC',
    price: '85,00',
    image: '/path/to/product1.jpg'
  },
  {
    id: 2,
    name: 'Jodavit + selen 250ml',
    price: '72,00',
    image: '/path/to/product2.jpg'
  },
  // Add other products...
];

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
