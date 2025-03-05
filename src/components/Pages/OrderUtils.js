export const API_URL = 'https://healthapi-zvfk.onrender.com';

export const SHIPPING_OPTIONS = {
  DPD: {
    id: 'DPD',
    name: 'Kurier DPD',
    cost: 14.99
  },
  DPD_ZA_POBRANIEM: {
    id: 'DPD_ZA_POBRANIEM',
    name: 'Kurier DPD - za pobraniem',
    cost: 14.99
  },
  INPOST: {
    id: 'INPOST',
    name: 'Kurier InPost',
    cost: 14.99
  },
  INPOST_PACZKOMATY: {
    id: 'INPOST_PACZKOMATY',
    name: 'InPost Paczkomaty',
    cost: 14.99
  },
  INPOST_PACZKOMATY_DARMOWA_WYSYLKA: {
    id: 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA',
    name: 'InPost Paczkomaty - Darmowa wysyłka',
    cost: 0
  }
};

export const DISCOUNT_CONFIG = {
  code: 'zinzino10',
  percentage: 10,
  shippingCost: 14.99,
  freeShippingThreshold: 300
};

export const validateForm = (formData) => {
  const required = ['firstName', 'lastName', 'street', 'postal', 'city', 'phone', 'email'];
  const errors = [];

  required.forEach(field => {
    if (!formData[field]) {
      errors.push(`Pole ${field} jest wymagane`);
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.push('Nieprawidłowy format adresu email');
  }

  const phoneRegex = /^(?:\+48|48)?[1-9]\d{8}$/;
  if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
    errors.push('Nieprawidłowy format numeru telefonu');
  }

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
  
  // Check for free shipping
  const shippingCost = subtotal >= DISCOUNT_CONFIG.freeShippingThreshold ? 0 : DISCOUNT_CONFIG.shippingCost;
  const total = totalBeforeShipping + shippingCost;

  return {
    subtotal,
    discountAmount,
    totalBeforeShipping,
    total,
    shippingCost,
    isFreeShipping: subtotal >= DISCOUNT_CONFIG.freeShippingThreshold
  };
};

export const isEligibleForFreeShipping = (subtotal) => {
  return subtotal >= DISCOUNT_CONFIG.freeShippingThreshold;
};

export const getShippingCost = (subtotal, selectedShipping) => {
  if (isEligibleForFreeShipping(subtotal)) {
    return 0;
  }
  return SHIPPING_OPTIONS[selectedShipping]?.cost || DISCOUNT_CONFIG.shippingCost;
};

export const appendToSheet = async (orderData, setRetryCount = () => {}) => {
  try {
    console.log('Sending order data to sheets:', orderData);
    
    const response = await fetch(`${API_URL}/api/guest-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Sheet API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error('Wystąpił błąd podczas składania zamówienia');
    }

    const data = await response.json();
    console.log('Sheet API response:', data);
    return data;
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

export const prepareSheetData = (orderData, formData, paymentStatus = 'new') => {
  const now = new Date();
  
  return {
    "Data wpływu": formatDate(now),
    "Forma płatności": "PayU",
    "Status płatności": paymentStatus,
    "PayU OrderId": orderData.payuOrderId || '',
    "PayU ExtOrderId": orderData.orderNumber || '',
    "Numer zamowienia": orderData.orderNumber,
    "Data": formatDate(now),
    "Status": orderData.status,
    "Suma": orderData.total,
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

export const isEmpty = (value) => {
  return value === null || 
         value === undefined || 
         (typeof value === 'string' && value.trim() === '') ||
         (Array.isArray(value) && value.length === 0) ||
         (typeof value === 'object' && Object.keys(value).length === 0);
};

export const validatePrice = (price) => {
  const number = Number(price);
  return !isNaN(number) && number >= 0;
};

export const cleanPhoneNumber = (phone) => {
  return phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
};