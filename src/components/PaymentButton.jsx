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

    const missingFields = requiredFields
      .filter(field => !formData[field.key]?.trim())
      .map(field => field.label);

    // Add shipping method validation
    if (!formData.shipping) {
      missingFields.push('Sposób dostawy');
    }

    // Add specific validation for Paczkomat if that shipping method is selected
    if (formData.shipping?.includes('PACZKOMATY') && !formData.paczkomat) {
      missingFields.push('Paczkomat (proszę wybrać paczkomat)');
    }

    return missingFields;
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
      
      // Get cart items from orderData
      // The issue is here - we need to access the cart data correctly
      console.log('OrderData received:', orderData);
      
      // Try to get cart items from different possible locations
      let cartItems = [];
      if (Array.isArray(orderData.cart) && orderData.cart.length > 0) {
        cartItems = orderData.cart;
      } else if (Array.isArray(orderData.items) && orderData.items.length > 0) {
        cartItems = orderData.items;
      } else {
        // Fallback to window.cartItems if it exists (from global state)
        const globalCart = window._cartState?.cart;
        if (Array.isArray(globalCart) && globalCart.length > 0) {
          cartItems = globalCart;
          console.log('Using global cart state:', globalCart);
        } else {
          console.error('No cart items found in any source!');
        }
      }
      
      console.log('Cart items found:', cartItems);

      // Format items in the exact structure needed
      const formattedItems = cartItems.map(item => ({
        id: item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, ''),
        n: item.name,
        p: parseInt(Number(item.price)),
        q: parseInt(item.quantity) || 1,
        image: item.image || `/img/products/${item.id?.toLowerCase() || item.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
      }));

      console.log('Formatted items:', formattedItems);

      // Create a properly structured payment data object
      const paymentData = {
        orderData: {
          orderNumber: orderData.orderNumber,
          total: orderData.total,
          // Important: Send the cart items properly
          cart: cartItems,
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

      // Add debug logging
      console.log('Payment request data:', {
        orderNumber: paymentData.orderData.orderNumber,
        cartItems: paymentData.orderData.cart.length,
        formattedItems: formattedItems
      });

      // Mark that we're entering payment flow before initiating payment
      if (user) {
        setPaymentFlowState(true);
        sessionStorage.setItem('inPaymentFlow', 'true');
      }
      
      const paymentResponse = await initiatePayment(paymentData);
      
      if (paymentResponse.redirectUrl) {
        // Store order reference and payment flow state in session storage
        sessionStorage.setItem('lastOrder', JSON.stringify({
          orderNumber: paymentResponse.orderNumber || orderData.orderNumber,
          payuOrderId: paymentResponse.orderId,
          date: new Date().toISOString(),
          status: 'PENDING',
          shipping: shippingMethod,
          isAuthenticated: !!user,
          userId: user?.$id || null
        }));

        // Also add better error logging
        console.log('Payment response:', {
          orderNumber: paymentResponse.orderNumber || orderData.orderNumber,
          payuOrderId: paymentResponse.orderId,
          redirectUrl: !!paymentResponse.redirectUrl,
          shipping: shippingMethod,
          isAuthenticated: !!user
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
      if (user) {
        setPaymentFlowState(false);
        sessionStorage.removeItem('inPaymentFlow');
      }
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
      
      {!formData.shipping && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-md">
          Proszę wybrać sposób dostawy przed kontynuowaniem
        </div>
      )}
      
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || externalLoading || isDisabled || !formData.shipping || 
          (formData.shipping?.includes('PACZKOMATY') && !formData.paczkomat)}
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
        ) : !formData.shipping ? (
          'Wybierz sposób dostawy'
        ) : formData.shipping?.includes('PACZKOMATY') && !formData.paczkomat ? (
          'Wybierz paczkomat'
        ) : (
          'Kupuję i płacę'
        )}
      </button>
    </div>
  );
};

export default PaymentButton;