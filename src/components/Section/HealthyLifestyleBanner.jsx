import React from 'react';
import { Link } from 'react-router-dom';

const HealthyLifestyleBanner = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
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
        >
          <img 
            src="/img/banner.jpg" 
            alt="Naturalne suplementy" 
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
        </div>
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;