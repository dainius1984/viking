import React, { useState } from 'react';
import { useAuth } from './AuthContext';
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

      const paymentData = {
        orderData,
        customerData: {
          Imie: formData.firstName?.trim(),
          Nazwisko: formData.lastName?.trim(),
          Email: formData.email?.trim().toLowerCase(),
          Telefon: formData.phone?.trim(),
          Ulica: formData.street?.trim(),
          'Kod pocztowy': formData.postal?.trim(),
          Miasto: formData.city?.trim(),
          Firma: formData.company?.trim() || ''
        },
        // Add authentication information
        isAuthenticated: !!user,
        userId: user?.$id || null
      };
      
      // Add debug logs
      console.log('User object:', user);
      console.log('Authentication data:', {
        isAuthenticated: !!user,
        userId: user?.$id
      });
      console.log('Full payment data:', paymentData);
      
      const paymentResponse = await initiatePayment(paymentData);
      
      if (paymentResponse.redirectUrl) {
        // Store order reference in session storage
// In PaymentButton.jsx, modify the sessionStorage save:
sessionStorage.setItem('lastOrder', JSON.stringify({
  orderNumber: orderData.orderNumber,
  payuOrderId: paymentResponse.orderId,  // Add this
  date: new Date().toISOString(),
  status: 'PENDING'  // Add initial status
}));

// Also add better error logging
console.log('Payment response:', {
  orderNumber: orderData.orderNumber,
  payuOrderId: paymentResponse.payuOrderId,
  redirectUrl: !!paymentResponse.redirectUrl
});
        // Redirect to payment gateway
        window.location.href = paymentResponse.redirectUrl;
      } else {
        throw new Error('Nie otrzymano linku do płatności');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Wystąpił błąd podczas inicjowania płatności. Spróbuj ponownie.');
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