import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { setPaymentFlowState } from './authService'; // Import the new function
// Fix import paths - adjust these based on your actual file structure
import { initiatePayment } from './Pages/PaymentService';

const PaymentButton = ({ 
  orderData, 
  formData, 
  loading: externalLoading,
  isDisabled 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();  // Get authentication context

  useEffect(() => {
    // Debug logging when formData changes - helps track shipping selection
    if (formData && formData.shipping) {
      console.log('Current shipping selection:', formData.shipping);
    }
  }, [formData]);

  const validateFormData = () => {
    const requiredFields = [
      { key: 'firstName', label: 'Imię' },
      { key: 'lastName', label: 'Nazwisko' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefon' },
      { key: 'street', label: 'Ulica' },
      { key: 'postal', label: 'Kod pocztowy' },
      { key: 'city', label: 'Miasto' }
    ];

    return requiredFields
      .filter(field => !formData[field.key]?.trim())
      .map(field => field.label);
  };

  const handlePayment = async () => {
    try {
      setError(null);
      const missingFields = validateFormData();
      
      if (missingFields.length > 0) {
        setError(`Proszę wypełnić wszystkie wymagane pola: ${missingFields.join(', ')}`);
        return;
      }

      setLoading(true);

      const shippingMethod = formData.shipping || 'DPD';
      
      // Ensure cart items are properly formatted as an array
      const cartItems = Array.isArray(orderData.items) 
        ? orderData.items 
        : orderData.cart || []; // Fallback to orderData.cart if items doesn't exist

      // Clean up the payment data structure
      const paymentData = {
        orderData: {
          orderNumber: orderData.orderNumber,
          total: Number(orderData.total).toFixed(2),
          cart: cartItems.map(item => ({
            name: item.name,
            quantity: parseInt(item.quantity) || 1,
            price: Number(item.price).toFixed(2)
          })),
          shipping: shippingMethod,
          notes: formData.notes || '',
          userId: user?.$id,
          isAuthenticated: !!user,
          paymentStatus: 'PENDING',
          createdAt: new Date().toISOString()
        },
        customerData: {
          Imie: formData.firstName?.trim(),
          Nazwisko: formData.lastName?.trim(),
          Email: formData.email?.trim().toLowerCase(),
          Telefon: formData.phone?.trim(),
          Ulica: formData.street?.trim(),
          'Kod pocztowy': formData.postal?.trim(),
          Miasto: formData.city?.trim(),
          Firma: formData.company?.trim() || '',
          Uwagi: formData.notes?.trim() || ''
        },
        isAuthenticated: !!user,
        userId: user?.$id || null
      };

      console.log('Payment request data:', paymentData);
      
      const paymentResponse = await initiatePayment(paymentData);
      
      if (paymentResponse.redirectUrl) {
        // Store order reference in session storage
        sessionStorage.setItem('lastOrder', JSON.stringify({
          orderNumber: paymentResponse.orderNumber || orderData.orderNumber,
          payuOrderId: paymentResponse.orderId,
          date: new Date().toISOString(),
          status: 'PENDING',
          shipping: shippingMethod // Store shipping method in session storage for reference
        }));

        // Also add better error logging
        console.log('Payment response:', {
          orderNumber: paymentResponse.orderNumber || orderData.orderNumber,
          payuOrderId: paymentResponse.orderId,
          redirectUrl: !!paymentResponse.redirectUrl,
          shipping: shippingMethod
        });
        
        // Redirect to payment gateway
        window.location.href = paymentResponse.redirectUrl;
      } else {
        throw new Error('Nie otrzymano linku do płatności');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie.');
      
      // If there's an error, remove the payment flow state
      setPaymentFlowState(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || externalLoading || isDisabled}
        className="w-full py-3 px-4 bg-green-800 text-white rounded-lg font-medium
          hover:bg-green-900 transition-all duration-200
          disabled:bg-gray-400 disabled:cursor-not-allowed
          active:transform active:scale-[0.99]
          text-sm sm:text-base mt-2"
      >
        {loading || externalLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
              />
            </svg>
            Przetwarzanie...
          </span>
        ) : (
          'Kupuję i płacę'
        )}
      </button>
    </div>
  );
};

export default PaymentButton;