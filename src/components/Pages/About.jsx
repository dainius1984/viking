import React, { useEffect } from 'react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] font-bold text-gray-800 leading-tight font-serif 
              mb-6 sm:mb-8 px-4 sm:px-0">
              Poznaj naszą historię
            </h1>
            
            {/* Hero Image */}
            <div className="w-full mb-8 sm:mb-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-black/10">
              <img 
                src="/img/banner.jpg" 
                alt="Health Family - O nas"
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-base sm:prose-lg mx-auto text-gray-700 space-y-4 sm:space-y-6 px-4 sm:px-0">
            <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6">
              <p className="text-gray-600">
                W Health Family wierzymy w siłę naturalnych rozwiązań i ich wpływ na nasze zdrowie. 
                Nasza historia zaczęła się od prostego pytania: dlaczego tak trudno znaleźć naprawdę 
                wysokiej jakości suplementy diety, które są jednocześnie skuteczne i bezpieczne?
              </p>

              {/* Image Placeholder 1 with Hover Effect */}
              <div className="relative group my-8">
                <div className="absolute inset-0 bg-emerald-100 rounded-lg transform transition-transform duration-300 group-hover:scale-105"></div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src="/img/about.jpg"
                    alt="Nasza misja"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Nasza misja</h3>
                    <p className="text-sm opacity-90">
                      Dostarczanie najwyższej jakości suplementów diety dla całej rodziny
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600">
                Po latach badań i współpracy z ekspertami, stworzyliśmy linię produktów, 
                która łączy w sobie najnowsze odkrycia naukowe z mądrością natury. 
                Każdy nasz produkt jest starannie opracowany, aby wspierać zdrowie 
                i dobre samopoczucie całej rodziny.
              </p>

              {/* Image Placeholder 2 with Hover Effect */}
              <div className="relative group my-8">
                <div className="absolute inset-0 bg-emerald-100 rounded-lg transform transition-transform duration-300 group-hover:scale-105"></div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src="https://placehold.co/800x400/4ade80/ffffff?text=Nasza+wizja"
                    alt="Nasza wizja"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Nasza wizja</h3>
                    <p className="text-sm opacity-90">
                      Budowanie świadomości zdrowotnej i promowanie zdrowego stylu życia
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600">
                Dziś jesteśmy dumni, że możemy oferować produkty, które nie tylko 
                wspierają zdrowie, ale także są wytwarzane z poszanowaniem środowiska 
                i najwyższych standardów jakości. Nasza misja to nie tylko sprzedaż 
                suplementów - to budowanie świadomości zdrowotnej i promowanie 
                zdrowego stylu życia.
              </p>
            </div>

            {/* Values Section with Updated Styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
              {/* Values Card - Naturalność */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-2 sm:mb-3">
                  Naturalność
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Starannie wyselekcjonowane składniki najwyższej jakości
                </p>
              </div>

              {/* Values Card - Skuteczność */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-2 sm:mb-3">
                  Skuteczność
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Potwierdzone działanie i zadowolenie klientów
                </p>
              </div>

              {/* Values Card - Bezpieczeństwo */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 md:col-span-1 mx-auto w-full">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-2 sm:mb-3">
                  Bezpieczeństwo
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Rygorystyczne standardy produkcji i kontroli jakości
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;