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
 */
export const initiatePayment = async (paymentData) => {
  try {
    // Bardziej szczegółowe logi
    console.log('Payment initialization:', {
      orderNumber: paymentData.orderData.orderNumber,
      isAuthenticated: paymentData.isAuthenticated,
      userId: paymentData.userId,
      total: paymentData.orderData.total
    });

    const response = await fetch(`${API_URL}/api/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
      credentials: 'include'
    });

    const data = await response.json();
    console.log('Payment gateway response:', {
      success: data.success,
      orderId: data.orderId,
      hasRedirectUrl: !!data.redirectUrl
    });

    // Check for API errors
    if (!response.ok) {
      throw new Error(data.error || data.details || 'Payment initialization failed');
    }

    // Verify redirect URL exists
    if (!data.redirectUrl) {
      throw new Error('No redirect URL received');
    }

    return data;
  } catch (error) {
    // Log detailed error information
    console.error('Payment error:', {
      message: error.message,
      response: error.response,
      data: error.response?.data
    });
    
    // Throw user-friendly error
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.details || 
      error.message || 
      'Payment failed'
    );
  }
};