import React, { useEffect, useState } from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import Header from '../components/Headers/Header';
import HeroSection from '../components/Section/HeroSection';
import HealthyLifestyleBanner from '../components/Section/HealthyLifestyleBanner';
import ProductGrid from '../components/Section/ProductGrid';
import InfoSection from '../components/Section/InfoSection';
import Footer from '../components/Footer/Footer';
import PromotionalModal from '../components/Pages/components/PromotionalModal';
import PromotionalButton from '../components/Pages/components/PromotionalButton';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after 2 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopNavBar and Header stacked normally */}
      <TopNavBar />
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <HealthyLifestyleBanner />
        <div className="py-8" id="products-section">
          <ProductGrid />
        </div>
        <InfoSection />
      </main>
      <Footer />

      {/* Promotional Modal */}
      <PromotionalModal isOpen={showModal} onClose={handleCloseModal} />
      
      {/* Floating Promotional Button */}
      <PromotionalButton onClick={handleShowModal} />
    </div>
  );
};

export default HomePage;