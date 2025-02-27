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
            
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className="flex items-center bg-green-50 px-4 py-3 rounded-xl border-l-4 border-green-600 shadow-sm animate-fadeIn">
                <span className="mr-2 text-xl">🧐</span>
                <p className="text-gray-700 font-medium">
                  Czy wiesz, że możesz sprawdzić swój poziom Omega-3?{' '}
                  <button 
                    onClick={openModal}
                    className="ml-1 text-[#006400] font-bold hover:text-[#008000] transition-colors 
                      duration-300 underline underline-offset-2 focus:outline-none focus:ring-2 
                      focus:ring-[#006400] focus:ring-offset-2 rounded-sm inline-flex items-center"
                    aria-label="Sprawdź jak zbadać poziom Omega-3"
                  >
                    Sprawdź jak to zrobić!
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </p>
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