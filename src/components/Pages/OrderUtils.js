const API_URL = 'https://healthapi-zvfk.onrender.com';

// Discount configuration
export const DISCOUNT_CONFIG = {
  code: process.env.NEXT_PUBLIC_DISCOUNT_CODE || 'zinzino10',
  percentage: parseInt(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE || '10'),
  shippingCost: 15
};

export const validateForm = (formData) => {
  const required = ['firstName', 'lastName', 'street', 'postal', 'city', 'phone', 'email'];
  const errors = [];

  required.forEach(field => {
    if (!formData[field]) {
      errors.push(`Pole ${field} jest wymagane`);
    }
  });

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.push('Nieprawidłowy format adresu email');
  }

  // Validate phone format (Polish number)
  const phoneRegex = /^(?:\+48|48)?[1-9]\d{8}$/;
  if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
    errors.push('Nieprawidłowy format numeru telefonu');
  }

  // Validate postal code (Polish format)
  const postalRegex = /^\d{2}-\d{3}$/;
  if (formData.postal && !postalRegex.test(formData.postal)) {
    errors.push('Nieprawidłowy format kodu pocztowego (XX-XXX)');
  }

  return errors;
};

export const appendToSheet = async (orderData, setRetryCount) => {
  const MAX_RETRIES = 3;
  let lastError;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(`${API_URL}/api/guest-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(orderData)
      });

      // Log response for debugging
      console.log('Response status:', response.status);
      const responseText = await response.text();
      
      if (!response.ok) {
        // Try to parse error response
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || responseText;
        } catch {
          errorMessage = responseText;
        }
        
        if (response.status === 429) {
          throw new Error('Zbyt wiele zamówień. Proszę spróbować później.');
        }
        
        throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
      }

      return response.status === 200 ? { success: true } : JSON.parse(responseText);
    } catch (error) {
      console.error('Attempt', i + 1, 'failed:', error);
      lastError = error;
      
      // Don't retry for specific errors
      if (error.message.includes('Zbyt wiele zamówień') || 
          error.message.includes('Missing required fields')) {
        throw error;
      }
      
      if (setRetryCount) {
        setRetryCount(prev => prev + 1);
      }

      // Wait before retrying (exponential backoff)
      if (i < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }
    }
  }

  throw lastError;
};

// Discount related functions
export const calculateDiscount = (subtotal, isDiscountApplied) => {
  if (!isDiscountApplied) return 0;
  return (subtotal * DISCOUNT_CONFIG.percentage) / 100;
};

export const validateDiscountCode = (code) => {
  return code.trim().toUpperCase() === DISCOUNT_CONFIG.code;
};

export const calculateTotals = (cart, isDiscountApplied = false) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = calculateDiscount(subtotal, isDiscountApplied);
  const totalBeforeShipping = subtotal - discountAmount;
  const total = totalBeforeShipping + DISCOUNT_CONFIG.shippingCost;

  return {
    subtotal,
    discountAmount,
    totalBeforeShipping,
    total
  };
};

// Helper function to format prices
export const formatPrice = (price) => {
  return Number(price).toFixed(2) + ' zł';
};

// Helper function to generate order number
export const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `ORD-${timestamp}-${random}`;
};

// Helper function to format date
export const formatDate = (date) => {
  return new Date(date).toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to check if device is mobile
export const isMobileDevice = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

// Helper function to prepare order data for spreadsheet
export const prepareSheetData = (orderData, formData) => {
  return {
    "Numer zamowienia": orderData.orderNumber,
    "Data": formatDate(new Date()),
    "Status": orderData.status,
    "Suma częściowa": formatPrice(orderData.subtotal),
    "Rabat zastosowany": orderData.discountApplied ? 'Tak' : 'Nie',
    "Kwota rabatu": formatPrice(orderData.discountAmount),
    "Koszt wysyłki": formatPrice(DISCOUNT_CONFIG.shippingCost),
    "Suma końcowa": formatPrice(orderData.total),
    "Wysylka": orderData.shipping,
    "Imie": formData.firstName,
    "Nazwisko": formData.lastName,
    "Firma": formData.company || '-',
    "Email": formData.email,
    "Telefon": formData.phone,
    "Ulica": formData.street,
    "Kod pocztowy": formData.postal,
    "Miasto": formData.city,
    "Uwagi": formData.notes || '-',
    "Produkty": orderData.items,
    "Platforma": isMobileDevice() ? 'Mobile' : 'Desktop'
  };
};

// Helper function to format order items for display
export const formatOrderItems = (cart) => {
  return cart.map(item => 
    `${item.name} (${item.quantity}x po ${formatPrice(item.price)} = ${formatPrice(item.quantity * item.price)})`
  ).join("\n");
};