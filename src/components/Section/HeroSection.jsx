import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div 
      className="w-full h-[calc(100vh-100px)] md:h-[80vh] min-h-[500px] bg-cover bg-center bg-no-repeat 
        flex items-center justify-center relative bg-fixed text-white text-center z-0 py-12"
      style={{ backgroundImage: `url('/img/main.jpeg')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="relative z-[2] max-w-[800px] px-5 animate-fadeInUp">
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
        
        <div className="mt-8 animate-bounce opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
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