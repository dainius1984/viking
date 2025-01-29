// PaymentService.js
import { API_URL } from './OrderUtils';

export const initiatePayment = async (paymentData) => {
  try {
    console.log('Initiating payment with data:', paymentData);

    const response = await fetch(`${API_URL}/api/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include'
    });

    const data = await response.json();
    
    console.log('Payment response:', data);

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Payment initialization failed');
    }

    if (!data.redirectUrl) {
      throw new Error('No redirect URL received');
    }

    return data;
  } catch (error) {
    console.error('Payment error:', {
      message: error.message,
      response: error.response,
      data: error.response?.data
    });
    
    // Re-throw a user-friendly error
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.details || 
      error.message || 
      'Payment failed'
    );
  }
};