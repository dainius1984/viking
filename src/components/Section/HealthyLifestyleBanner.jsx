import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Omega3InfoModal from './Omega3InfoModal';

const HealthyLifestyleBanner = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto my-4 px-5 relative">
        <div className="flex flex-row items-center p-8 md:p-[30px] bg-white/95 backdrop-blur-lg rounded-[20px] 
          shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:flex-row flex-col gap-8 md:gap-[60px]">
          
          <Link 
            to="/category" 
            onClick={handleClick}
            className="group flex-none md:flex-[0_0_45%] relative overflow-hidden rounded-2xl 
              shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out 
              block cursor-pointer w-full md:w-auto hover:-translate-y-[3px] 
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            aria-label="Przejdź do kategorii"
          >
            <img 
              src="/img/banner.jpg" 
              alt="Zdrowy styl życia dla całej rodziny" 
              className="w-full h-full object-cover block transition-transform duration-500 
                ease-in-out group-hover:scale-[1.05]"
            />
          </Link>

          <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
            <div className="space-y-3">
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-extrabold text-gray-700 
                leading-[1.3] m-0 tracking-[-0.01em] drop-shadow-sm">
                Zdrowie zaczyna się
              </h2>
              <h2 className="text-[30px] md:text-[34px] lg:text-[38px] font-black text-[#006400] 
                leading-[1.3] m-0 tracking-[-0.01em] transition-colors duration-300 
                hover:text-[#008000] drop-shadow-sm">
                w rodzinie
              </h2>
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3] 
                m-0 tracking-[-0.01em] bg-gradient-to-r from-[#006400] to-[#0a8a0a] 
                bg-clip-text text-transparent drop-shadow-sm">
                zmieniajcie nawyki razem!
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mt-6 font-medium max-w-2xl">
              Zacznij już dziś i ciesz się energią każdego dnia!
            </p>
            
            <div className="mt-5 w-full">
              <div className="bg-green-50 rounded-lg border border-green-100 p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center">
                  <span className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center text-amber-800 mr-3 flex-shrink-0">
                    🧐
                  </span>
                  <span className="text-gray-700 font-medium text-sm md:text-base">
                    Czy wiesz, że możesz sprawdzić swój poziom Omega-3?
                  </span>
                </div>
                <button 
                  onClick={openModal}
                  className="bg-[#006400] hover:bg-[#008000] text-white font-medium text-sm md:text-base py-2 px-4 rounded-md transition-all duration-300 whitespace-nowrap flex items-center justify-center flex-shrink-0 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#006400] focus:ring-offset-2"
                  aria-label="Sprawdź jak zbadać poziom Omega-3"
                >
                  Sprawdź jak to zrobić
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Omega-3 Info Modal */}
      <Omega3InfoModal isOpen={showModal} onClose={closeModal} />
    </>
  );
};

export default HealthyLifestyleBanner;