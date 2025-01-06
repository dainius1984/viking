// PaymentService.js
import { API_URL } from './OrderUtils';

export const initiatePayment = async (orderData, formData) => {
  try {
    const response = await fetch(`${API_URL}/api/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData,
        customerData: {
          Email: formData.email,
          Telefon: formData.phone,
          Imie: formData.firstName,
          Nazwisko: formData.lastName,
          Ulica: formData.street,
          'Kod pocztowy': formData.postal,
          Miasto: formData.city
        }
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Payment initialization failed');
    }

    const data = await response.json();
    
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    } else {
      throw new Error('No redirect URL received');
    }

    return data;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};