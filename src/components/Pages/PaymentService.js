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
    console.log('=== PAYMENT INITIATION START ===');
    console.log('1. Payment Data:', {
      orderNumber: paymentData.orderData.orderNumber,
      total: paymentData.orderData.total,
      customerEmail: paymentData.customerData.Email,
      shipping: paymentData.orderData.shipping,
      time: new Date().toISOString()
    });
    
    // Log the API URL being used
    console.log('2. Using API URL:', API_URL);
    
    const controller = new AbortController();
    console.log('3. Created AbortController');
    
    const timeoutId = setTimeout(() => {
      console.log('TIMEOUT TRIGGERED - Aborting request after 15 seconds');
      controller.abort();
    }, 15000);
    
    console.log('4. Sending fetch request to:', `${API_URL}/api/create-payment`);
    
    try {
      const response = await fetch(`${API_URL}/api/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://familybalance.pl'
        },
        body: JSON.stringify(paymentData),
        signal: controller.signal,
        mode: 'cors',
        credentials: 'include'
      });
      
      console.log('5. Received response:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      clearTimeout(timeoutId);
      console.log('6. Cleared timeout');
      
      if (!response.ok) {
        console.error('7. ERROR: Payment API error response:', {
          status: response.status,
          statusText: response.statusText,
          orderNumber: paymentData.orderData.orderNumber,
          time: new Date().toISOString()
        });
        
        // Try to get the error message from the response
        let errorText = 'Server responded with an error';
        try {
          const errorData = await response.json();
          console.log('8. Error response body:', errorData);
          errorText = errorData.message || errorText;
        } catch (e) {
          console.error('9. Failed to parse error response:', e);
        }
        
        throw new Error(errorText);
      }
      
      console.log('7. SUCCESS: Parsing response body');
      const data = await response.json();
      console.log('8. Parsed response data:', {
        hasRedirectUrl: !!data.redirectUrl,
        orderId: data.orderId,
        orderNumber: data.orderNumber
      });
      
      return data;
    } catch (fetchError) {
      console.error('FETCH ERROR:', {
        name: fetchError.name,
        message: fetchError.message,
        type: fetchError.type,
        stack: fetchError.stack
      });
      throw fetchError;
    }
    
  } catch (error) {
    console.error('=== PAYMENT ERROR ===', {
      errorType: error.constructor.name,
      message: error.message,
      orderNumber: paymentData.orderData.orderNumber,
      time: new Date().toISOString(),
      stack: error.stack
    });
    
    // For CORS errors, provide a more helpful error message
    if (error.message === 'Failed to fetch') {
      throw new Error('Problem z połączeniem z serwerem płatności. Prosimy spróbować później lub skontaktować się z obsługą.');
    }
    
    if (error.name === 'AbortError') {
      throw new Error('Przekroczono czas oczekiwania na odpowiedź serwera. Prosimy spróbować ponownie.');
    }
    
    throw error;
  } finally {
    console.log('=== PAYMENT INITIATION END ===');
  }
};