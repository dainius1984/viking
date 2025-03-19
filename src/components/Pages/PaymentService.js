/**
 * Payment Service Module
 * Handles payment processing through the payment gateway
 */

import { API_URL } from './OrderUtils';

/**
 * Initiates payment process with the payment gateway
 * 
 * @param {Object} paymentData - Payment information
 * @param {Object} paymentData.orderData - Order details
 * @param {Object} paymentData.customerData - Customer information
 * @returns {Promise<Object>} Payment gateway response with redirect URL
 * @throws {Error} If payment initialization fails
 /** */
 
export const initiatePayment = async (paymentData) => {
  try {
    console.log('Initiating payment with data:', {
      orderNumber: paymentData.orderData.orderNumber,
      total: paymentData.orderData.total,
      time: new Date().toISOString()
    });
    
    // Add a timeout to the fetch to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
    
    const response = await fetch('https://healthapi-zvfk.onrender.com/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add an Origin header explicitly
        'Origin': 'https://familybalance.pl'
      },
      body: JSON.stringify(paymentData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('Payment API error response:', {
        status: response.status,
        statusText: response.statusText,
        orderNumber: paymentData.orderData.orderNumber,
        time: new Date().toISOString()
      });
      
      // Try to get the error message from the response
      let errorText = 'Server responded with an error';
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorText;
      } catch (e) {
        // Ignore JSON parsing errors
      }
      
      throw new Error(errorText);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Payment error:', {
      message: error.message,
      orderNumber: paymentData.orderData.orderNumber,
      time: new Date().toISOString(),
      response: undefined,
      data: undefined
    });
    
    // For CORS errors, provide a more helpful error message
    if (error.message === 'Failed to fetch') {
      throw new Error('Problem z połączeniem z serwerem płatności. Prosimy spróbować później lub skontaktować się z obsługą.');
    }
    
    throw error;
  }
};