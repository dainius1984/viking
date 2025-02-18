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
    // Add more detailed logging
    console.log('Initiating payment:', {
      orderNumber: paymentData.orderData.orderNumber,
      isAuthenticated: paymentData.isAuthenticated,
      userId: paymentData.userId,
      total: paymentData.orderData.total,
      time: new Date().toISOString()
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
    
    // Add more detailed success logging
    console.log('Payment initiation response:', {
      success: data.success,
      orderId: data.orderId,
      hasRedirectUrl: !!data.redirectUrl,
      orderNumber: paymentData.orderData.orderNumber,
      time: new Date().toISOString()
    });

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Payment initialization failed');
    }

    if (!data.redirectUrl) {
      throw new Error('No redirect URL received from payment service');
    }

    return data;
  } catch (error) {
    // Add more detailed error logging
    console.error('Payment error:', {
      message: error.message,
      orderNumber: paymentData.orderData.orderNumber,
      time: new Date().toISOString(),
      response: error.response,
      data: error.response?.data
    });
    
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.details || 
      error.message || 
      'Payment failed'
    );
  }
};