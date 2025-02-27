import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import Omega3InfoModal from '../Section/Omega3InfoModal';
import ProductModal from './ProductModal';

const HealthProtocolPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Product details
  const products = [
    {
      id: 'balance-oil',
      name: 'BalanceOil+',
      price: '159,00',
      image: '/img/products/balance.webp',
      category: 'suplementy',
      description: 'Dostarcza wysokiej jakości Omega-3 z mórz norweskich, wspomaga równowagę kwasów tłuszczowych, redukuje stany zapalne i poprawia funkcjonowanie organizmu.',
      properties: {
        'Pojemność': '300 ml',
        'Składniki': 'Olej rybny, olej z oliwek, witamina D3',
        'Zalecana dawka': '0,1 ml na kg masy ciała'
      }
    },
    {
      id: 'zinobiotic',
      name: 'ZinoBiotic+',
      price: '149,00',
      image: '/img/products/ZinzinoBiotic.jfif',
      category: 'suplementy',
      description: 'Kompleks naturalnych błonników wspierający zdrowie jelit, mikrobiom i trawienie, co ma kluczowe znaczenie dla odporności i metabolizmu.',
      properties: {
        'Waga': '180g',
        'Składniki': 'Błonnik z kukurydzy, błonnik z cykorii, błonnik owsiany, błonnik jabłkowy',
        'Zalecana dawka': '6g dziennie'
      }
    },
    {
      id: 'xtend',
      name: 'Xtend+',
      price: '179,00',
      image: '/img/products/xtend.webp',
      category: 'suplementy',
      description: 'Zaawansowany kompleks witamin, minerałów i przeciwutleniaczy, który wzmacnia układ odpornościowy, wspiera regenerację komórek i działa przeciwstarzeniowo.',
      properties: {
        'Ilość kapsułek': '60',
        'Składniki': 'Witaminy, minerały, przeciwutleniacze',
        'Zalecana dawka': '2 kapsułki dziennie'
      }
    }
  ];

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <TopNavBar />
      <Header />
      
      {/* Omega-3 Info Modal */}
      <Omega3InfoModal isOpen={showModal} onClose={closeModal} />
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}
      
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-green-50 to-white rounded-xl overflow-hidden shadow-lg shadow-black/5 mt-12 mb-16">
          <div className="px-6 py-12 md:py-16">
            <h1 className="text-4xl md:text-[2.8rem] font-bold text-center text-gray-800 mb-6 leading-tight font-serif">
              Mamy kompleksowe rozwiązanie dla Twojego zdrowia!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-emerald-800 mb-8">
              Zinzino Health Protocol – odbuduj zdrowie od podstaw
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center mb-8">
                To zaawansowany system suplementacji, który działa na poziomie komórkowym i wspiera organizm w kluczowych obszarach zdrowia:
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Product 1 */}
          <div 
            className="bg-white rounded-md shadow-lg shadow-black/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => openProductModal(products[0])}
          >
            <div className="h-[300px] overflow-hidden flex items-center justify-center p-4 bg-white">
              <img 
                src="/img/products/balance.webp" 
                alt="BalanceOil+" 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=BalanceOil+';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                BalanceOil+
              </h3>
              <p className="text-gray-700">
                Dostarcza wysokiej jakości Omega-3 z mórz norweskich, wspomaga równowagę kwasów tłuszczowych, redukuje stany zapalne i poprawia funkcjonowanie organizmu.
              </p>
            </div>
          </div>

          {/* Product 2 */}
          <div 
            className="bg-white rounded-md shadow-lg shadow-black/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => openProductModal(products[1])}
          >
            <div className="h-[300px] overflow-hidden flex items-center justify-center p-4 bg-white">
              <img 
                src="/img/products/ZinzinoBiotic.jfif" 
                alt="ZinoBiotic+" 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=ZinoBiotic+';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                ZinoBiotic+
              </h3>
              <p className="text-gray-700">
                Kompleks naturalnych błonników wspierający zdrowie jelit, mikrobiom i trawienie, co ma kluczowe znaczenie dla odporności i metabolizmu.
              </p>
            </div>
          </div>

          {/* Product 3 */}
          <div 
            className="bg-white rounded-md shadow-lg shadow-black/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => openProductModal(products[2])}
          >
            <div className="h-[300px] overflow-hidden flex items-center justify-center p-4 bg-white">
              <img 
                src="/img/products/xtend.webp" 
                alt="Xtend+" 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Xtend+';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                Xtend+
              </h3>
              <p className="text-gray-700">
                Zaawansowany kompleks witamin, minerałów i przeciwutleniaczy, który wzmacnia układ odpornościowy, wspiera regenerację komórek i działa przeciwstarzeniowo.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg shadow-black/5 border-l-4 border-emerald-800">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                💡
              </span>
              <div>
                <h3 className="text-xl font-bold text-emerald-800 mb-3">Synergia działania</h3>
                <p className="text-gray-700 text-lg">
                  Dzięki synergicznemu działaniu tych trzech suplementów wspierasz zdrowie na poziomie komórkowym, eliminując przewlekłe stany zapalne i dostarczając organizmowi niezbędnych składników odżywczych.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* How It Works Section */}
        <div className="bg-gray-50 py-12 px-6 rounded-xl shadow-lg shadow-black/5 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 font-serif">
            Jak działa Zinzino Health Protocol?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Krok 1</h3>
              <p className="text-gray-700">
                <button onClick={openModal} className="inline text-emerald-800 hover:underline">
                  Wykonaj test BalanceTest
                </button> aby poznać swój poziom kwasów tłuszczowych
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Krok 2</h3>
              <p className="text-gray-700">Rozpocznij suplementację z protokołem zdrowia Zinzino</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Krok 3</h3>
              <p className="text-gray-700">Po 120 dniach wykonaj kolejny test, aby zobaczyć poprawę wyników</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-10 rounded-xl shadow-lg shadow-black/5 text-center mb-16 border-t-4 border-emerald-800">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
            Sprawdź swój poziom i rozpocznij swoją drogę do lepszego zdrowia już dziś!
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={openModal}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center animate-fadeIn pulse-animation"
            >
              Sprawdź swój poziom
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <Link 
              to="/category" 
              className="bg-white border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              Sprawdź produkty
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 font-serif">
            Co mówią nasi klienci?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Anna K.</h4>
                  <p className="text-gray-500 text-sm">Klient od 6 miesięcy</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Po 4 miesiącach stosowania protokołu mój poziom Omega-3 znacząco się poprawił. Czuję się pełna energii i mam lepszą koncentrację."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Marek W.</h4>
                  <p className="text-gray-500 text-sm">Klient od roku</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Moje problemy trawienne znacznie się zmniejszyły dzięki ZinoBiotic+. Teraz całą rodzinę namówiłem na protokół zdrowia."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Katarzyna M.</h4>
                  <p className="text-gray-500 text-sm">Klient od 8 miesięcy</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Stosuję cały protokół i zauważyłam znaczną poprawę mojej skóry i poziomu energii. Polecam każdemu kto chce zadbać o zdrowie od podstaw."
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-12 px-8 rounded-xl shadow-lg shadow-black/10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
              Gotowy na zmiany?
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Rozpocznij swoją drogę do lepszego zdrowia z protokołem Zinzino. {' '}
              <button onClick={openModal} className="inline text-white font-bold hover:underline">
                Zbadaj swój poziom Omega-3
              </button> {' '}
              i zobacz realne rezultaty w ciągu kilku miesięcy.
            </p>
            <Link 
              to="/category" 
              className="bg-white text-emerald-800 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-lg"
              onClick={() => window.scrollTo(0, 0)}
            >
              Sprawdź produkty
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthProtocolPage;