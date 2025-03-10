// OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { setPaymentFlowState } from '../authService'; // Import the function
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../AuthContext'; // Add this import
import { databases } from '../appwrite'; // Import databases from appwrite.js

const OrderConfirmation = () => {
  const { clearCart } = useCart(); // Remove unused state and dispatch
  const { user } = useAuth(); // Add this line to get user state
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCleared, setHasCleared] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Oczekująca');
  const [statusLoading, setStatusLoading] = useState(false);
  const [initialDelayComplete, setInitialDelayComplete] = useState(false);

  // Function to fetch the current order status from Appwrite
  const fetchOrderStatus = async (orderNumber) => {
    if (!orderNumber) return;
    
    setStatusLoading(true);
    try {
      console.log('Fetching status for order:', orderNumber);
      
      // Query Appwrite for the order with this orderNumber
      const response = await databases.listDocuments(
        '67545c1800028e002c86', // Database ID
        '67545c2c001276c2c261', // Collection ID
        [
          // Query to find the order by orderNumber
          databases.equal('orderNumber', orderNumber)
        ]
      );

      if (response.documents && response.documents.length > 0) {
        const order = response.documents[0];
        console.log('Found order in Appwrite:', order);
        
        // Map the status to a user-friendly display
        const statusMap = {
          'PENDING': 'Oczekująca',
          'PAID': 'Opłacone',
          'CANCELLED': 'Anulowane',
          'REJECTED': 'Odrzucone'
        };
        
        // Set the payment status based on the order status
        const newStatus = statusMap[order.status] || order.status || 'Oczekująca';
        setPaymentStatus(newStatus);
        
        console.log('Updated payment status to:', newStatus);
        
        // If payment is complete, we can stop polling
        if (newStatus === 'Opłacone' || newStatus === 'Anulowane' || newStatus === 'Odrzucone') {
          console.log('Payment status finalized, stopping polling');
          return true; // Signal to stop polling
        }
      } else {
        console.log('Order not found in Appwrite, keeping default status');
      }
      return false; // Continue polling
    } catch (error) {
      console.error('Error fetching order status:', error);
      return false; // Continue polling despite error
    } finally {
      setStatusLoading(false);
    }
  };

  // Add initial delay before first status check
  useEffect(() => {
    if (orderData?.orderNumber && !initialDelayComplete) {
      console.log('Starting initial delay before first status check...');
      
      // Wait 10 seconds before first status check to allow webhook to process
      const delayTimer = setTimeout(() => {
        console.log('Initial delay complete, ready to start polling');
        setInitialDelayComplete(true);
      }, 10000); // 10 second delay
      
      return () => clearTimeout(delayTimer);
    }
  }, [orderData, initialDelayComplete]);

  // Set up a polling mechanism to check for status updates after initial delay
  useEffect(() => {
    let intervalId;
    
    if (orderData?.orderNumber && initialDelayComplete) {
      console.log('Initial delay complete, starting status polling');
      
      // Initial fetch
      fetchOrderStatus(orderData.orderNumber);
      
      // Set up polling every 10 seconds
      intervalId = setInterval(async () => {
        const shouldStopPolling = await fetchOrderStatus(orderData.orderNumber);
        if (shouldStopPolling) {
          console.log('Stopping status polling - final status received');
          clearInterval(intervalId);
        }
      }, 10000); // Check every 10 seconds
    }
    
    // Clean up interval on unmount
    return () => {
      if (intervalId) {
        console.log('Cleaning up status polling interval');
        clearInterval(intervalId);
      }
    };
  }, [orderData?.orderNumber, initialDelayComplete]);

  useEffect(() => {
    try {
      // End the payment flow - return to normal session behavior
      setPaymentFlowState(false);
      
      // Get order data from session storage
      const storedOrder = sessionStorage.getItem('lastOrder');
      if (storedOrder && !hasCleared) {
        const parsedOrder = JSON.parse(storedOrder);
        
        // Check if there's paczkomat data in localStorage
        if (parsedOrder.hasPaczkomatData) {
          try {
            const paczkomatData = localStorage.getItem(`paczkomat_data_${parsedOrder.orderNumber}`);
            if (paczkomatData) {
              // Add paczkomat data to the order data
              parsedOrder.paczkomat = JSON.parse(paczkomatData);
            }
          } catch (error) {
            console.error('Error retrieving paczkomat data from localStorage:', error);
          }
        }
        
        setOrderData(parsedOrder);
        
        // Clear the cart only once
        console.log('Clearing cart after successful order');
        clearCart(); // This function handles both user types
        setHasCleared(true);
      }
    } catch (error) {
      console.error('Error retrieving order data or clearing cart:', error);
    } finally {
      setLoading(false);
    }
  }, [clearCart, hasCleared]);

  // Render the payment status with appropriate colors
  const renderPaymentStatus = () => {
    let statusColor = 'bg-yellow-500';
    let statusText = paymentStatus;
    
    if (!initialDelayComplete) {
      return (
        <div className="flex items-center mt-1">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-gray-600">Przetwarzanie płatności...</span>
        </div>
      );
    }
    
    if (statusLoading) {
      return (
        <div className="flex items-center mt-1">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-gray-600">Sprawdzanie statusu...</span>
        </div>
      );
    }
    
    switch (paymentStatus) {
      case 'Opłacone':
        statusColor = 'bg-green-500';
        break;
      case 'Anulowane':
      case 'Odrzucone':
        statusColor = 'bg-red-500';
        break;
      default:
        statusColor = 'bg-yellow-500';
    }
    
    return (
      <div className="flex items-center mt-1">
        <span className={`inline-block w-3 h-3 ${statusColor} rounded-full mr-2`}></span>
        <span className="text-gray-600">{statusText}</span>
      </div>
    );
  };

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
              
              {/* Display paczkomat data if available */}
              {orderData.paczkomat && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h2 className="font-semibold text-gray-700">Wybrany paczkomat:</h2>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-bold">{orderData.paczkomat.name}</p>
                    </div>
                    <p className="ml-7 text-gray-600">{orderData.paczkomat.address}</p>
                    {orderData.paczkomat.post_code && (
                      <p className="ml-7 text-gray-600">{orderData.paczkomat.post_code} {orderData.paczkomat.city}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <h2 className="font-semibold text-gray-700">Status płatności:</h2>
                {renderPaymentStatus()}
                <p className="text-sm text-gray-500 mt-1">
                  {paymentStatus === 'Opłacone' 
                    ? 'Dziękujemy! Twoja płatność została zrealizowana.' 
                    : paymentStatus === 'Anulowane' || paymentStatus === 'Odrzucone'
                      ? 'Płatność nie została zrealizowana. Prosimy spróbować ponownie lub skontaktować się z nami.'
                      : 'Po potwierdzeniu płatności, wyślemy Ci e-mail z potwierdzeniem.'}
                </p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-6">
                Na Twój adres e-mail zostało wysłane potwierdzenie zamówienia
                wraz ze szczegółami dotyczącymi płatności i dostawy.
              </p>
              
              <div className="space-y-3">
                {user && (
                  <Link 
                    to="/account" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors mr-4"
                  >
                    Moje Zakupy
                  </Link>
                )}
                <Link 
                  to="/" 
                  className="inline-block bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-colors"
                >
                  Kontynuuj zakupy
                </Link>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 text-center">
              <p>Masz pytania dotyczące zamówienia?</p>
              <p>Skontaktuj się z nami: <a href="mailto:sklep@familybalance.pl" className="text-green-600 hover:underline">sklep@familybalance.pl</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;