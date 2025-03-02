import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import Omega3InfoModal from '../Section/Omega3InfoModal';
import ProductModal from './ProductModal';
import products from '../../Data/products-data'; // Import products from your data file

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

  // Filter only the two new products (ID 17 and 18)
  const protocolProducts = products.filter(product => product.id === 17 || product.id === 18);

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
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 font-serif">
            Nasze rekomendowane produkty
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Wybierz jeden z naszych starannie dobranych zestawów, które zapewnią Ci kompleksowe wsparcie dla Twojego zdrowia.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Map through the filtered products */}
            {protocolProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-lg shadow-emerald-100/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border border-gray-100"
                onClick={() => openProductModal(product)}
              >
                {/* Product Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full z-10">
                    Polecany
                  </div>
                  
                  {/* Image Container with Fixed Aspect Ratio */}
                  <div className="relative pt-[75%] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex items-start mb-4">
                    <span className="bg-green-100 text-green-600 p-1 rounded-full flex-shrink-0 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-800 transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-800">
                      {product.price} zł
                    </div>
                    
                    <div className="bg-emerald-50 text-emerald-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
                      <span>Szczegóły</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              <img 
  src="/img/products/1.jfif" 
  alt="Anna K." 
  className="w-12 h-12 rounded-full object-cover mr-4"
/>
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
              <img 
  src="/img/products/1.jfif" 
  alt="Anna K." 
  className="w-12 h-12 rounded-full object-cover mr-4"
/>
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
              <img 
  src="/img/products/1.jfif" 
  alt="Anna K." 
  className="w-12 h-12 rounded-full object-cover mr-4"
/>
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