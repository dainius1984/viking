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
    
    // Make header transparent on mount
    const header = document.querySelector('header');
    if (header) {
      header.classList.add('bg-transparent', 'border-none', 'absolute', 'top-0', 'left-0', 'w-full', 'z-10');
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Restore header style when unmounting
      if (header) {
        header.classList.remove('bg-transparent', 'border-none', 'absolute', 'top-0', 'left-0', 'w-full', 'z-10');
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* No TopNavBar - hidden as requested */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-auto">
        <Header />
      </div>
      <main className="flex-grow">
        <HeroSection />
        <HealthyLifestyleBanner />
        <div className="py-8" id="products-section">
          <ProductGrid />
        </div>
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;