import React, { useEffect } from 'react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const Regulamin = () => {
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
              Regulamin
            </h1>
            
            {/* Hero Image */}
            <div className="w-full mb-8 sm:mb-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-black/10">
              <img 
                src="/img/banner.jpg" 
                alt="Health Family - Regulamin"
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-base sm:prose-lg mx-auto text-gray-700 space-y-4 sm:space-y-6 px-4 sm:px-0">
            <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4">
                REGULAMIN SPRZEDAŻY PRZY WYKORZYSTANIU ŚRODKÓW POROZUMIEWANIA SIĘ NA ODLEGŁOŚĆ ORAZ ŚWIADCZENIA USŁUG DROGĄ ELEKTRONICZNĄ
              </h2>

              <p className="text-gray-600">
                Niniejszy regulamin określa zasady dokonywania zakupów w sklepie internetowym prowadzonym przez 
                Sprzedającego pod adresem www.familybalance.pl
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                <p className="text-gray-700">
                  Sprzedającym jest Dariusz Szoen Brain, Chess&Supplements dostępny pod adresem ul. Wybickiego 100, 
                  41-404 Mysłowice, prowadzący działalność na podstawie jednoosobowej działalności gospodarczej, 
                  podlegający wpisowi do Centralnej Ewidencji Działalności Gospodarczej wpisany pod numerem 
                  NIP: 2220750968, Regon: 385840670, zwany także zamiennie „Usługodawcą".
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Kontakt z Usługodawcą można uzyskać:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>pod numerami telefonów Infolinii Konsumenckiej (Infolinii): ++48 533 813 285</li>
                  <li>korzystając z adresu poczty elektronicznej: sklep@familybalance.pl</li>
                </ul>
              </div>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 1 Definicje</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Regulamin</strong> – niniejszy regulamin. W zakresie usług świadczonych drogą 
                    elektroniczną Regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 
                    2002 r. o świadczeniu usług drogą elektroniczną.
                  </p>
                  <p>
                    <strong>Klient (Kupujący)</strong> – osoba fizyczna, która ukończyła co najmniej 13. rok 
                    życia, przy czym w przypadku nieukończenia przez tę osobę 18. roku życia, wymagana jest 
                    zgoda jej przedstawiciela ustawowego.
                  </p>
                  {/* Additional sections follow the same pattern */}
                </div>
              </section>

              {/* Additional sections (§ 2-7) following the same pattern */}
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 2 Zasady ogólne</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Warunkiem złożenia Zamówienia w Sklepie Internetowym przez Kupującego jest zapoznanie się 
                    z niniejszym Regulaminem i akceptacja jego postanowień w czasie realizacji Zamówienia.
                  </p>
                  {/* Continue with remaining content */}
                </div>
              </section>

              {/* Continue with remaining sections */}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Regulamin;