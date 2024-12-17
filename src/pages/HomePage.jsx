import React, { useEffect, useState } from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import Header from '../components/Headers/Header';
import HeroSection from '../components/Section/HeroSection';
import HealthyLifestyleBanner from '../components/Section/HealthyLifestyleBanner';
import ProductGrid from '../components/Section/ProductGrid';
import InfoSection from '../components/Section/InfoSection';
import PreFooter from '../components/Footer/PreFooter';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {!isMobile && <TopNavBar />}
      <Header />
      <HeroSection />
      <HealthyLifestyleBanner />
      <ProductGrid />
      <InfoSection />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default HomePage;