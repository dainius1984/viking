// OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../AuthContext';
import { setPaymentFlowState } from '../authService'; // Import the function
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const OrderConfirmation = () => {
  const { state, dispatch, clearCart } = useCart(); // Get clearCart function from context
  const { user } = useAuth(); // Get user to check authentication status
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // End the payment flow - return to normal session behavior
      setPaymentFlowState(false);
      
      // Get order data from session storage
      const storedOrder = sessionStorage.getItem('lastOrder');
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderData(parsedOrder);
        
        // Clear the cart for both guest and logged-in users
        console.log('Clearing cart after successful order');
        clearCart(); // This function handles both user types
      }
    } catch (error) {
      console.error('Error retrieving order data or clearing cart:', error);
    } finally {
      setLoading(false);
    }
  }, [clearCart]);

  if (loading) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!orderData) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full text-center">
            <h1 className="text-xl font-semibold mb-4">Nie znaleziono danych zamówienia</h1>
            <p className="text-gray-600 mb-6">
              Nie mogliśmy znaleźć informacji o Twoim zamówieniu. Jeśli właśnie dokonałeś zakupu,
              sprawdź swoją skrzynkę e-mail w celu potwierdzenia lub skontaktuj się z nami.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Wróć do strony głównej
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <svg 
                  className="w-10 h-10 text-green-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Dziękujemy za złożenie zamówienia!
            </h1>
            
            <div className="border-t border-b border-gray-200 py-4 my-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-gray-700">Numer zamówienia:</h2>
                  <p className="text-gray-600">{orderData.orderNumber}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <h2 className="font-semibold text-gray-700">Data zamówienia:</h2>
                  <p className="text-gray-600">
                    {new Date(orderData.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="font-semibold text-gray-700">Status płatności:</h2>
                <div className="flex items-center mt-1">
                  <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-gray-600">Oczekująca</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Po potwierdzeniu płatności, wyślemy Ci e-mail z potwierdzeniem.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-6">
                Na Twój adres e-mail zostało wysłane potwierdzenie zamówienia
                wraz ze szczegółami dotyczącymi płatności i dostawy.
              </p>
              
              <Link 
                to="/" 
                className="inline-block bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-colors"
              >
                Kontynuuj zakupy
              </Link>
            </div>
            
            <div className="text-sm text-gray-500 text-center">
              <p>Masz pytania dotyczące zamówienia?</p>
              <p>Skontaktuj się z nami: <a href="mailto:contact@example.com" className="text-green-600 hover:underline">contact@example.com</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;