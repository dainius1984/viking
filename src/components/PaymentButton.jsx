// PaymentButton.jsx
import React, { useState } from 'react';
import { initiatePayment } from './PaymentService';

const PaymentButton = ({ orderData, formData }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const paymentData = {
        orderData,
        customerData: formData
      };
      await initiatePayment(paymentData);  // Pass single object
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-3 bg-green-800 text-white rounded-lg font-medium
        hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed
        text-sm sm:text-base mt-2"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Przetwarzanie...
        </span>
      ) : (
        'Kupuję i płacę'
      )}
    </button>
  );
};

export default PaymentButton;