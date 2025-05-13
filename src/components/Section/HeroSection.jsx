import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Load video with lower priority to improve initial performance
  useEffect(() => {
    // Small delay before loading video to prioritize other page elements
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = productsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="w-full h-screen min-h-[500px] relative flex items-center justify-center z-0"
    >
      {/* Video Background with optimization */}
      {videoLoaded ? (
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/main.jpeg" // Show image while video loads
          src="/videos/sport.mp4"
        >
          {/* Fallback for browsers that don't support MP4 */}
          <source src="/videos/sport.mp4" type="video/mp4" />
          <img src="/img/main.jpeg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover" />
        </video>
      ) : (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0" 
          style={{ backgroundImage: `url('/img/main.jpeg')` }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] max-w-[800px] px-5 animate-fadeInUp text-white text-center">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-5">
          Naturalne Suplementy Diety
        </h1>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] mb-8">
          Wzmocnij zdrowie dzięki naturze!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link 
            to="/category" 
            className="inline-block bg-[#0a683f] text-white border-2 border-transparent px-7 py-3.5 
              text-lg font-semibold rounded-full transition-all duration-300 uppercase tracking-wider
              shadow-[0_4px_15px_rgba(10,104,63,0.3)] w-full sm:w-auto
              hover:bg-[#055229] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(10,104,63,0.4)]
              active:translate-y-0.5 active:shadow-[0_2px_10px_rgba(10,104,63,0.2)]"
          >
            Zobacz Produkty
          </Link>
          
          <Link 
            to="/health-protocol" 
            className="inline-block bg-transparent text-white border-2 border-white px-7 py-3.5 
              text-lg font-semibold rounded-full transition-all duration-300 uppercase tracking-wider
              shadow-[0_4px_15px_rgba(255,255,255,0.15)] w-full sm:w-auto
              hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)]
              active:translate-y-0.5 active:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
          >
            Protokół Zdrowia
          </Link>
        </div>
        
        <div 
          className="mt-8 animate-bounce opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
          onClick={scrollToProducts}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToProducts();
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
            <path d="M7 13l5 5 5-5"></path>
            <path d="M7 7l5 5 5-5"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Add the fadeInUp animation to your global CSS or Tailwind config
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 1.5s ease-out;
  }
`;
document.head.appendChild(styleTag);

export default HeroSection;