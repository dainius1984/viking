import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaHeart, FaTruck, FaUndo } from 'react-icons/fa';
import LinkSection from './LinkSection';

const InfoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/category');
    window.scrollTo(0, 0);
  };

  const features = [
    {
      icon: <FaLeaf />,
      title: "Naturalne składniki",
      description: "Inspirowane naturą, tworzone z myślą o Twoim zdrowiu"
    },
    {
      icon: <FaHeart />,
      title: "Wysoka jakość",
      description: "Starannie wyselekcjonowane składniki i kontrola jakości"
    },
    {
      icon: <FaTruck />,
      title: "Darmowa wysyłka powyżej 300 zł",
      description: "Bezpłatna dostawa dla większych zamówień"
    },
    {
      icon: <FaUndo />,
      title: "14 dni na zwrot",
      description: "Gwarancja satysfakcji z zakupu"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-5 sm:p-5 text-center">
      {/* Header Section */}
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] items-center gap-10 
        mb-8 p-8 ml-0 md:ml-40 bg-gradient-to-r from-[rgba(10,104,63,0.05)] to-transparent rounded-2xl">
        <div className="flex justify-center items-center w-full max-w-[300px] mb-4 md:mb-0">
          <img 
            src="/img/logo.jpg" 
            alt="Family Balance logo" 
            className="w-[120px] h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="w-full text-center md:text-left">
          <h1 className="text-2xl md:text-[28px] lg:text-[32px] text-[#006400] m-0 leading-tight font-semibold">
            Suplementy Diety
          </h1>
          <h2 className="text-base md:text-lg text-gray-700 mt-1.5 font-normal">
            Family Balance
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid gap-5 my-8">
        <p className="text-lg leading-relaxed text-gray-600 text-center max-w-[800px] mx-auto">
          Omega-3, witaminy i minerały to kluczowe składniki odżywcze, których braki odczuwamy coraz częściej. 
          W ciągu ostatnich dziesięcioleci jakość żywności uległa znacznemu pogorszeniu – produkty są wysoko 
          przetworzone i pełne sztucznych dodatków. Dodatkowo, coraz częściej stosowane są metody sztucznego 
          zwiększania wagi mięsa, co odbija się na jego wartości odżywczej. W efekcie{' '}
          <strong className="text-[#0a683f]">nasza codzienna dieta jest uboga w ważne składniki odżywcze</strong>.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4 lg:gap-8 mt-5 max-w-[1200px] p-0">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center justify-start text-center p-5 w-full">
              <div className="w-[70px] h-[70px] mb-4 flex items-center justify-center text-[#006400]">
                {React.cloneElement(feature.icon, { size: 40 })}
              </div>
              <h3 className="text-base text-gray-700 m-0 font-medium leading-relaxed w-full">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-[250px] mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content */}
      <div className="bg-gray-50 rounded-lg p-5 sm:p-5 my-5 max-w-[1000px] mx-auto text-center">
        <h3 className="text-2xl text-[#006400] my-5 relative pb-2.5 text-center inline-block
          after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
          after:w-[50px] after:h-0.5 after:bg-[#006400]">
          Health Family – wsparcie dla każdego
        </h3>
        <p className="text-lg leading-relaxed text-gray-600 text-center">
          Suplementy diety od Health Family to{' '}
          <strong className="text-[#0a683f]">idealny wybór dla całej rodziny</strong>. 
          Dbając o zdrowie swoje i swoich bliskich, warto sięgnąć po produkty, które wspierają 
          koncentrację, wzmacniają odporność oraz korzystnie wpływają na serce, mózg i układ krwionośny.
        </p>

        <button 
          onClick={handleClick} 
          className="bg-[#006400] text-white border-none px-8 py-3 text-base font-semibold rounded-lg 
            cursor-pointer transition-all duration-300 mt-5 inline-block shadow-[0_4px_15px_rgba(0,100,0,0.15)]
            hover:bg-[#005300] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,100,0,0.2)]"
        >
          Zobacz więcej
        </button>
      </div>

      <LinkSection />
    </div>
  );
};

export default InfoSection;