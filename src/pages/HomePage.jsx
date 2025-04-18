import React, { useEffect, useState } from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import Header from '../components/Headers/Header';
import HeroSection from '../components/Section/HeroSection';
import HealthyLifestyleBanner from '../components/Section/HealthyLifestyleBanner';
import ProductGrid from '../components/Section/ProductGrid';
import InfoSection from '../components/Section/InfoSection';
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
    <div className="flex flex-col min-h-screen">
      {!isMobile && <TopNavBar />}
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HealthyLifestyleBanner />
        <div className="py-8">
          <ProductGrid />
        </div>
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;