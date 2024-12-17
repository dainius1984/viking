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
          Wegański Suplement Diety
        </h1>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] mb-8">
          Wzmocnij zdrowie dzięki naturze!
        </p>
        <Link 
          to="/category" 
          className="inline-block bg-[#0a683f] text-white border-2 border-transparent px-9 py-4 
            text-lg font-semibold rounded-full transition-all duration-300 uppercase tracking-wider
            shadow-[0_4px_15px_rgba(10,104,63,0.3)]
            hover:bg-[#055229] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(10,104,63,0.4)]
            active:translate-y-0.5 active:shadow-[0_2px_10px_rgba(10,104,63,0.2)]"
        >
          Zobacz Produkty
        </Link>
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