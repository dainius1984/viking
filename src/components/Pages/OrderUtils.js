export const API_URL = 'https://healthapi-zvfk.onrender.com';

export const DISCOUNT_CONFIG = {
  code: 'zinzino10',
  percentage: 10,
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

export const validateDiscountCode = (code) => {
  if (!code) return false;
  return code.trim().toLowerCase() === DISCOUNT_CONFIG.code.toLowerCase();
};

export const calculateTotals = (cart = [], isDiscountApplied = false) => {
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  const discountAmount = isDiscountApplied ? 
    (subtotal * DISCOUNT_CONFIG.percentage) / 100 : 0;

  const totalBeforeShipping = subtotal - discountAmount;
  const total = totalBeforeShipping + DISCOUNT_CONFIG.shippingCost;

  return {
    subtotal,
    discountAmount,
    totalBeforeShipping,
    total
  };
};

export const appendToSheet = async (orderData, setRetryCount = () => {}) => {
  try {
    const response = await fetch(`${API_URL}/api/guest-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Wystąpił błąd podczas składania zamówienia');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in appendToSheet:', error);
    setRetryCount(prev => prev + 1);
    throw error;
  }
};

export const formatPrice = (price) => {
  const number = Number(price);
  if (isNaN(number)) return '0.00 zł';
  return `${number.toFixed(2)} zł`;
};

export const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `ORD-${timestamp}-${random}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatOrderItems = (cart) => {
  if (!Array.isArray(cart)) return '';
  
  return cart.map(item => 
    `${item.name} (${item.quantity}x po ${formatPrice(item.price)} = ${formatPrice(item.quantity * item.price)})`
  ).join("\n");
};

export const prepareSheetData = (orderData, formData) => {
  return {
    "Numer zamowienia": orderData.orderNumber,
    "Data": formatDate(new Date()),
    "Status": orderData.status,
    "Suma": orderData.total, // Changed from orderData.total to ensure proper format
    "Suma częściowa": orderData.subtotal,
    "Rabat": orderData.discountApplied ? 'Tak' : 'Nie',
    "Kwota rabatu": orderData.discountAmount,
    "Koszt wysyłki": orderData.shippingCost,
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
    "Produkty": orderData.items
  };
};

// Helper function to check if a value is empty
export const isEmpty = (value) => {
  return value === null || 
         value === undefined || 
         (typeof value === 'string' && value.trim() === '') ||
         (Array.isArray(value) && value.length === 0) ||
         (typeof value === 'object' && Object.keys(value).length === 0);
};

// Helper function to validate prices
export const validatePrice = (price) => {
  const number = Number(price);
  return !isNaN(number) && number >= 0;
};

export const cleanPhoneNumber = (phone) => {
  return phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
};