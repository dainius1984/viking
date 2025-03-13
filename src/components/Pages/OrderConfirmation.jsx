// OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { setPaymentFlowState } from '../authService'; // Import the function
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../AuthContext'; // Add this import
import { databases, Query } from '../appwrite'; // Import databases and Query from appwrite.js

// Function to create InPost shipments
const createInPostShipment = async (orderData) => {
  try {
    // Log the full order data received by the function
    console.log('createInPostShipment received orderData:', JSON.stringify(orderData, null, 2));
    
    // Check if we have paczkomat data
    if (!orderData.paczkomat) {
      console.error('No paczkomat data available for shipment creation');
      return { success: false, error: 'Missing paczkomat data' };
    }

    // Prepare the payload for the API
    const payload = {
      orderNumber: orderData.orderNumber,
      recipient: {
        name: `${orderData.firstName} ${orderData.lastName}`,
        email: orderData.email,
        phone: orderData.phone,
        paczkomatId: orderData.paczkomat.name // This should be the paczkomat ID
      },
      packageDetails: {
        size: 'A', // Default size, adjust based on your needs
        weight: 1.0 // Default weight in kg, adjust based on your needs
      }
    };

    // Log the prepared payload
    console.log('Sending payload to InPost API:', JSON.stringify(payload, null, 2));

    // Call the backend API
    const response = await fetch('/api/shipping/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Log the raw response
    console.log('Raw response from InPost API:', response);

    const data = await response.json();
    
    // Log the parsed response data
    console.log('Parsed response data from InPost API:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.details || 'Failed to create shipment');
    }

    console.log('Shipment created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error creating InPost shipment:', error);
    return { success: false, error: error.message };
  }
};

const OrderConfirmation = () => {
  const { clearCart } = useCart(); // Remove unused state and dispatch
  const { user } = useAuth(); // Add this line to get user state
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCleared, setHasCleared] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Opłacone'); // Set default to Opłacone
  const [shipmentStatus, setShipmentStatus] = useState(null);

  useEffect(() => {
    try {
      // End the payment flow - return to normal session behavior
      setPaymentFlowState(false);
      
      // Get order data from session storage
      const storedOrder = sessionStorage.getItem('lastOrder');
      console.log('Raw data from sessionStorage:', storedOrder);
      
      if (storedOrder && !hasCleared) {
        const parsedOrder = JSON.parse(storedOrder);
        console.log('Parsed order data from sessionStorage:', parsedOrder);
        
        // Check if there's paczkomat data in localStorage
        if (parsedOrder.hasPaczkomatData) {
          try {
            const paczkomatKey = `paczkomat_data_${parsedOrder.orderNumber}`;
            console.log('Looking for paczkomat data with key:', paczkomatKey);
            
            // Log all localStorage keys to help debug
            console.log('All localStorage keys:', Object.keys(localStorage));
            
            const paczkomatData = localStorage.getItem(paczkomatKey);
            console.log('Raw paczkomat data from localStorage:', paczkomatData);
            
            if (paczkomatData) {
              // Add paczkomat data to the order data
              const parsedPaczkomatData = JSON.parse(paczkomatData);
              console.log('Parsed paczkomat data:', parsedPaczkomatData);
              
              parsedOrder.paczkomat = parsedPaczkomatData;
              console.log('Order data with paczkomat added:', parsedOrder);
            } else {
              console.log('No paczkomat data found in localStorage');
              
              // Try to find any paczkomat data in localStorage that might match
              const paczkomatKeys = Object.keys(localStorage).filter(key => key.includes('paczkomat_data_'));
              console.log('Found these paczkomat keys in localStorage:', paczkomatKeys);
            }
          } catch (error) {
            console.error('Error retrieving paczkomat data from localStorage:', error);
          }
        } else {
          console.log('Order does not have paczkomat data flag');
          console.log('Order shipping method:', parsedOrder.shipping);
          
          // Check if the shipping method is a paczkomat method but the flag is missing
          if (parsedOrder.shipping && parsedOrder.shipping.includes('PACZKOMATY')) {
            console.log('Order is using a paczkomat shipping method but hasPaczkomatData flag is missing');
            
            // Try to find any paczkomat data in localStorage that might match
            const paczkomatKeys = Object.keys(localStorage).filter(key => key.includes('paczkomat_data_'));
            console.log('Found these paczkomat keys in localStorage:', paczkomatKeys);
            
            if (paczkomatKeys.length > 0) {
              // Try to use the most recent paczkomat data
              const mostRecentKey = paczkomatKeys[paczkomatKeys.length - 1];
              console.log('Trying to use paczkomat data from key:', mostRecentKey);
              
              const paczkomatData = localStorage.getItem(mostRecentKey);
              if (paczkomatData) {
                try {
                  const parsedPaczkomatData = JSON.parse(paczkomatData);
                  console.log('Found paczkomat data:', parsedPaczkomatData);
                  
                  // Add paczkomat data to the order data
                  parsedOrder.paczkomat = parsedPaczkomatData;
                  parsedOrder.hasPaczkomatData = true;
                  console.log('Added paczkomat data to order:', parsedOrder);
                } catch (error) {
                  console.error('Error parsing paczkomat data:', error);
                }
              }
            }
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

  // Add this function to handle shipment creation
  const handleCreateShipment = async () => {
    console.log('handleCreateShipment called');
    
    if (!orderData || !orderData.paczkomat) {
      console.log('Missing required data for shipment creation:', {
        hasOrderData: !!orderData,
        hasPaczkomatData: !!(orderData && orderData.paczkomat)
      });
      return;
    }

    // Only create shipment if payment is complete
    if (paymentStatus !== 'Opłacone') {
      console.log('Payment not completed yet, skipping shipment creation');
      return;
    }

    // Log the data being prepared for shipment creation
    console.log('Preparing data for InPost shipment creation:', {
      orderNumber: orderData.orderNumber,
      firstName: orderData.firstName || '(missing)',
      lastName: orderData.lastName || '(missing)',
      email: orderData.email || '(missing)',
      phone: orderData.phone || '(missing)',
      paczkomatName: orderData.paczkomat?.name || '(missing)',
      paczkomatAddress: orderData.paczkomat?.address || '(missing)'
    });

    try {
      const shipmentData = {
        ...orderData,
        firstName: orderData.firstName || '',
        lastName: orderData.lastName || '',
        email: orderData.email || '',
        phone: orderData.phone || ''
      };
      
      console.log('Calling createInPostShipment with data:', JSON.stringify(shipmentData, null, 2));
      
      const result = await createInPostShipment(shipmentData);

      if (result.success) {
        setShipmentStatus({
          status: 'success',
          trackingNumber: result.data.trackingNumber,
          labelUrl: result.data.labelUrl
        });
      } else {
        setShipmentStatus({
          status: 'error',
          message: result.error
        });
      }
    } catch (error) {
      console.error('Error in shipment creation:', error);
      setShipmentStatus({
        status: 'error',
        message: error.message
      });
    }
  };

  // Add effect to create shipment when payment is complete
  useEffect(() => {
    console.log('Shipment creation effect triggered with:', {
      paymentStatus,
      hasPaczkomat: !!orderData?.paczkomat,
      hasShipmentStatus: !!shipmentStatus,
      shippingMethod: orderData?.shipping
    });
    
    // Check if we have paczkomat data or if the shipping method indicates we should
    const isPaczkomatShipping = orderData?.shipping && orderData.shipping.includes('PACZKOMATY');
    const hasPaczkomatData = !!orderData?.paczkomat;
    
    if (paymentStatus === 'Opłacone' && hasPaczkomatData && !shipmentStatus) {
      console.log('Conditions met for automatic shipment creation');
      handleCreateShipment();
    } else if (paymentStatus === 'Opłacone' && isPaczkomatShipping && !hasPaczkomatData && !shipmentStatus) {
      console.log('Order is using paczkomat shipping but paczkomat data is missing');
      
      // Try to find any paczkomat data in localStorage
      const paczkomatKeys = Object.keys(localStorage).filter(key => key.includes('paczkomat_data_'));
      console.log('Found these paczkomat keys in localStorage:', paczkomatKeys);
      
      if (paczkomatKeys.length > 0) {
        // Use the most recent paczkomat data
        const mostRecentKey = paczkomatKeys[paczkomatKeys.length - 1];
        console.log('Using paczkomat data from key:', mostRecentKey);
        
        try {
          const paczkomatData = localStorage.getItem(mostRecentKey);
          if (paczkomatData) {
            const parsedPaczkomatData = JSON.parse(paczkomatData);
            
            // Update the order data with the paczkomat data
            setOrderData(prevData => ({
              ...prevData,
              paczkomat: parsedPaczkomatData,
              hasPaczkomatData: true
            }));
            
            console.log('Updated order data with paczkomat data from localStorage');
          }
        } catch (error) {
          console.error('Error retrieving paczkomat data from localStorage:', error);
        }
      }
    } else {
      console.log('Conditions NOT met for automatic shipment creation');
    }
  }, [paymentStatus, orderData, shipmentStatus]);

  // Render the payment status with appropriate colors
  const renderPaymentStatus = () => {
    return (
      <div className="flex items-center mt-1">
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        <span className="text-gray-600">Opłacone</span>
      </div>
    );
  };

  // Add this function to render shipment status
  const renderShipmentStatus = () => {
    if (!shipmentStatus) {
      // If no shipment status, show create shipment button
      if (orderData?.paczkomat) {
        return (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <h2 className="font-semibold text-gray-700">Status wysyłki:</h2>
            <div className="flex items-center mt-1">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-gray-600">Oczekuje na utworzenie</span>
            </div>
            <button
              onClick={handleCreateShipment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Utwórz przesyłkę InPost
            </button>
          </div>
        );
      }
      return null;
    }

    if (shipmentStatus.status === 'success') {
      return (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <h2 className="font-semibold text-gray-700">Status wysyłki:</h2>
          <div className="flex items-center mt-1">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-600">Przesyłka utworzona</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Numer śledzenia: {shipmentStatus.trackingNumber}
          </p>
          {shipmentStatus.labelUrl && (
            <a 
              href={shipmentStatus.labelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Pobierz etykietę
            </a>
          )}
        </div>
      );
    }

    if (shipmentStatus.status === 'error') {
      return (
        <div className="mt-4 p-3 bg-red-50 rounded-md">
          <h2 className="font-semibold text-gray-700">Status wysyłki:</h2>
          <div className="flex items-center mt-1">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="text-gray-600">Błąd tworzenia przesyłki</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {shipmentStatus.message || 'Wystąpił błąd podczas tworzenia przesyłki.'}
          </p>
          <button
            onClick={handleCreateShipment}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    return null;
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
                  Dziękujemy! Twoja płatność została zrealizowana.
                </p>
              </div>
              
              {/* Add shipment status section */}
              {renderShipmentStatus()}
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