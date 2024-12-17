import React from 'react';
import { Link } from 'react-router-dom';

const HealthyLifestyleBanner = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-[1200px] mx-auto my-2.5 px-5 relative">
      <div className="flex flex-row items-center gap-[50px] p-6 md:p-[25px] bg-white/92 backdrop-blur-lg rounded-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.06)] 
        md:flex-row flex-col gap-5 md:gap-[50px]">
        
        <Link 
          to="/category" 
          onClick={handleClick}
          className="group flex-none md:flex-[0_0_45%] relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] 
            transition-all duration-300 ease-in-out block cursor-pointer w-full md:w-auto
            hover:-translate-y-[3px] hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)]"
        >
          <img 
            src="/img/banner.jpg" 
            alt="Naturalne suplementy" 
            className="w-full h-full object-cover block transition-transform duration-500 ease-in-out 
              group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex-1 flex flex-col gap-0.5 text-center md:text-left">
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-extrabold text-[#1a1a1a] leading-[1.15] m-0 tracking-[-0.01em]">
            Uczyń zdrowy
          </h2>
          <h2 className="text-[32px] md:text-[36px] lg:text-[42px] font-extrabold text-[#006400] leading-[1.15] m-0 tracking-[-0.01em]">
            tryb życia
          </h2>
          <h2 className="text-[34px] md:text-[38px] lg:text-[44px] font-extrabold leading-[1.15] m-0 tracking-[-0.01em]
            bg-gradient-to-r from-[#006400] to-[#0a8a0a] bg-clip-text text-transparent">
            swoim nawykiem!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HealthyLifestyleBanner;