import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';

const BalanceOilLandingPage = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  
  // BalanceOil+ product data (ID: 1 as per your URL)
  const balanceOilProduct = {
    id: 1,
    name: 'BalanceOil+300ml Cytrynowy',
    price: 175,
    image: '/img/products/1.png',
    category: 'Suplementy',
    subtitle: 'Naturalny olej omega-3 o działaniu przeciwzapalnym'
  };
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Add product to cart using the same logic as ProductCard
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        id: balanceOilProduct.id,
        name: balanceOilProduct.name,
        price: balanceOilProduct.price,
        image: balanceOilProduct.image,
        category: balanceOilProduct.category,
        quantity: 1
      }
    });

    // Navigate to cart page and scroll to top
    navigate('/koszyk');
    window.scrollTo(0, 0);
  };

    
  const scrollToProduct = () => {
    document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <TopNavBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-green-50 to-white rounded-xl overflow-hidden shadow-lg shadow-black/5 mt-12 mb-16">
          <div className="px-6 py-12 md:py-16 text-center">
            <h1 className="text-4xl md:text-[2.8rem] font-bold text-gray-800 mb-6 leading-tight font-serif">
              Kup BalanceOil bez subskrypcji – szybciej, taniej, bez zobowiązań
            </h1>
            
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl mr-3">📦</span>
                <p className="text-lg text-gray-700">
                  Oryginalny produkt Zinzino z gwarancją autentyczności.
                </p>
              </div>
              <div className="flex items-center justify-center mb-8">
                <span className="text-2xl mr-3">💸</span>
                <p className="text-lg text-gray-700">
                  Oszczędzaj i zamawiaj, kiedy chcesz – bez podpisywania umów.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-lg shadow-lg"
            >
              KUP TERAZ
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-black/5 mb-16 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 font-serif">
            Dlaczego warto kupić tutaj?
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-2xl mr-4 flex-shrink-0">✔️</span>
              <p className="text-lg text-gray-800 font-medium">
                100% oryginalny BalanceOil od Zinzino
              </p>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-2xl mr-4 flex-shrink-0">✔️</span>
              <p className="text-lg text-gray-800 font-medium">
                Kupujesz tylko wtedy, kiedy chcesz – bez abonamentu
              </p>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-2xl mr-4 flex-shrink-0">✔️</span>
              <p className="text-lg text-gray-800 font-medium">
                Czysty skład, certyfikat IFOS – bez metali ciężkich
              </p>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-2xl mr-4 flex-shrink-0">✔️</span>
              <p className="text-lg text-gray-800 font-medium">
                Wysyłka z Polski w 24h
              </p>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 text-2xl mr-4 flex-shrink-0">✔️</span>
              <p className="text-lg text-gray-800 font-medium">
                Niższa cena niż w oficjalnym sklepie Zinzino
              </p>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-gray-50 py-12 px-6 rounded-xl shadow-lg shadow-black/5 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <span className="text-3xl mr-4">💬</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">
                Ponad 10 000 zadowolonych klientów Zinzino w Polsce i Europie
              </h2>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Szukałam sposobu na kupienie Zinzino bez wiązania się umową. Znalazłam tutaj – ta sama jakość, bez stresu. Polecam!"
              </blockquote>
              <cite className="text-gray-600 font-bold not-italic">– Anna K.</cite>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div id="product-section" className="bg-white p-10 rounded-xl shadow-lg shadow-black/5 mb-16 border-t-4 border-emerald-800">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-4">📦</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">
                BalanceOil+ 300 ml
              </h2>
            </div>
            
            <div className="mb-8 space-y-4">
              <p className="text-lg text-gray-700">
                – naturalny olej omega-3 o działaniu przeciwzapalnym
              </p>
              <p className="text-lg text-gray-700">
                – idealny dla dorosłych, seniorów, kobiet, całych rodzin
              </p>
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <span className="text-3xl mr-4">💰</span>
              <div className="text-4xl font-bold text-emerald-800">
                Cena: 229 zł
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-3">🛒</span>
              <button 
                onClick={handleAddToCart}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-lg shadow-lg"
              >
                Dodaj do koszyka
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 font-serif">
            Najczęstsze pytania (FAQ)
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Czy to oryginalny produkt?
              </h3>
              <p className="text-gray-700 text-lg">
                Tak – 100% oryginalny, z oficjalnej dystrybucji Zinzino.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Czy muszę coś podpisywać?
              </h3>
              <p className="text-gray-700 text-lg">
                Nie – kupujesz pojedynczy produkt bez żadnych umów.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg shadow-black/5 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Czy wysyłacie szybko?
              </h3>
              <p className="text-gray-700 text-lg">
                Tak – paczka wychodzi w 24 godziny z Polski.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-12 px-8 rounded-xl shadow-lg shadow-black/10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
              Gotowy na zakup?
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Zamów swój BalanceOil+ już dziś i ciesz się wysokiej jakości suplementem omega-3 bez żadnych zobowiązań.
            </p>
            <button 
              onClick={handleAddToCart}
              className="bg-white text-emerald-800 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-lg shadow-lg"
            >
              Dodaj do koszyka
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BalanceOilLandingPage;