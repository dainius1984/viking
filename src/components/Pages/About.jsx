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
              O nas – Twoje zdrowie, nasza misja
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
                W Health Family wierzymy, że zdrowie zaczyna się od codziennych wyborów. 
                Obserwując, jak jakość naszej żywności uległa pogorszeniu w ciągu ostatnich dekad, 
                stworzyliśmy markę, która odpowiada na potrzeby współczesnych rodzin. Naszą misją 
                jest dostarczenie Ci najwyższej jakości suplementów diety, które uzupełniają 
                niedobory kluczowych składników, takich jak omega-3, witaminy i minerały.
              </p>

              <p className="text-gray-600">
                Dzięki naszym produktom wspierasz koncentrację, odporność, a także zdrowie serca, 
                mózgu i układu krwionośnego – wszystko po to, by Ty i Twoi bliscy mogli cieszyć 
                się pełnią życia każdego dnia. W Health Family stawiamy na naturalność, skuteczność 
                i bezpieczeństwo, tworząc rozwiązania, które są idealne dla całej rodziny.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="my-8 sm:my-12 py-6 sm:py-8 px-4 sm:px-6 bg-emerald-50/50 rounded-lg sm:rounded-xl 
              border border-emerald-100">
              <p className="text-lg sm:text-xl md:text-2xl text-emerald-800 font-bold text-center italic leading-relaxed">
                Dołącz do naszej misji i zadbaj o zdrowie na najwyższym poziomie!
              </p>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
              {/* Values Card - Naturalność */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-2 sm:mb-3">
                  Naturalność
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Starannie wyselekcjonowane składniki najwyższej jakości
                </p>
              </div>

              {/* Values Card - Skuteczność */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 mb-2 sm:mb-3">
                  Skuteczność
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Potwierdzone działanie i zadowolenie klientów
                </p>
              </div>

              {/* Values Card - Bezpieczeństwo */}
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm 
                hover:shadow-md transition-shadow duration-300 sm:col-span-2 md:col-span-1 mx-auto w-full">
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