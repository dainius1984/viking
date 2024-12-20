import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import { FaCheckCircle, FaHome, FaFileAlt, FaEnvelope } from 'react-icons/fa';

const OrderConfirmation = () => {
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString('pl-PL');
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL');

  return (
    <>
      <TopNavBar />
      <Header />
      {/* Main container with responsive padding */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {/* Confirmation card with responsive padding and rounded corners */}
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg text-center">
          {/* Success Icon with responsive sizing */}
          <div className="animate-[scale-up_0.5s_ease-out] text-green-800">
            <FaCheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6" />
          </div>

          {/* Confirmation Message with responsive typography */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Dziękujemy za złożenie zamówienia!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-3">
            Twoje zamówienie zostało przyjęte do realizacji.
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Wkrótce otrzymasz email z potwierdzeniem zamówienia na podany adres.
          </p>

          {/* Order Details with responsive spacing and layout */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-left">
            <div className="font-mono text-base sm:text-lg font-semibold text-green-800 mb-3 sm:mb-4">
              Numer zamówienia: {orderNumber}
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 last:border-0 gap-1 sm:gap-4">
                <span className="text-gray-600 text-sm sm:text-base">Data złożenia:</span>
                <span className="font-medium text-gray-900 text-sm sm:text-base">{orderDate}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 last:border-0 gap-1 sm:gap-4">
                <span className="text-gray-600 text-sm sm:text-base">Przewidywana data dostawy:</span>
                <span className="font-medium text-gray-900 text-sm sm:text-base">{estimatedDelivery}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-200 last:border-0 gap-1 sm:gap-4">
                <span className="text-gray-600 text-sm sm:text-base">Status:</span>
                <span className="font-medium text-green-800 text-sm sm:text-base">W trakcie realizacji</span>
              </div>
            </div>
          </div>

          {/* Action Buttons with responsive layout and spacing */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-800 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-200 hover:bg-green-900 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
            >
              <FaHome className="w-4 h-4" />
              Powrót do strony głównej
            </Link>
            
            <Link 
              to="/orders" 
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-green-800 text-green-800 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 hover:bg-green-50 w-full sm:w-auto"
            >
              <FaFileAlt className="w-4 h-4" />
              Moje zamówienia
            </Link>
          </div>

          {/* Email Confirmation Note with responsive typography */}
          <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500">
            <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Kopia potwierdzenia została wysłana na Twój adres email
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Add the animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes scale-up {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default OrderConfirmation;