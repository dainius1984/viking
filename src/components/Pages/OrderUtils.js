/**
 * Order Utilities
 * Contains utility functions and configurations for order processing
 */

// API endpoint for the health service
export const API_URL = 'https://healthapi-zvfk.onrender.com';

/**
 * Discount configuration settings
 * @constant {Object}
 */
export const DISCOUNT_CONFIG = {
  code: 'zinzino10',      // Discount code
  percentage: 10,         // Discount percentage
  shippingCost: 15       // Fixed shipping cost
};

/**
 * Validates form data for required fields and format
 * @param {Object} formData - Customer form data
 * @returns {Array} Array of validation error messages
 */
export const validateForm = (formData) => {
  const required = ['firstName', 'lastName', 'street', 'postal', 'city', 'phone', 'email'];
  const errors = [];

  // Check required fields
  required.forEach(field => {
    if (!formData[field]) {
      errors.push(`Pole ${field} jest wymagane`);
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.push('Nieprawidłowy format adresu email');
  }

  // Phone validation (Polish format)
  const phoneRegex = /^(?:\+48|48)?[1-9]\d{8}$/;
  if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
    errors.push('Nieprawidłowy format numeru telefonu');
  }

  // Postal code validation (Polish format)
  const postalRegex = /^\d{2}-\d{3}$/;
  if (formData.postal && !postalRegex.test(formData.postal)) {
    errors.push('Nieprawidłowy format kodu pocztowego (XX-XXX)');
  }

  return errors;
};

/**
 * Validates discount code against configuration
 * @param {string} code - Discount code to validate
 * @returns {boolean} True if code is valid
 */
export const validateDiscountCode = (code) => {
  if (!code) return false;
  return code.trim().toLowerCase() === DISCOUNT_CONFIG.code.toLowerCase();
};

/**
 * Calculates order totals including discounts and shipping
 * @param {Array} cart - Array of cart items
 * @param {boolean} isDiscountApplied - Whether discount should be applied
 * @returns {Object} Calculated totals
 */
export const calculateTotals = (cart = [], isDiscountApplied = false) => {
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  // Apply discount if applicable
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

/**
 * Appends order data to backend sheet
 * @param {Object} orderData - Order data to append
 * @param {Function} setRetryCount - Callback to update retry counter
 * @returns {Promise} API response
 */
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
/**
 * Formats price with currency
 * @param {number|string} price - Price to format
 * @returns {string} Formatted price with currency
 */
export const formatPrice = (price) => {
  const number = Number(price);
  if (isNaN(number)) return '0.00 zł';
  return `${number.toFixed(2)} zł`;
};

/**
 * Generates unique order number
 * @returns {string} Generated order number
 */
export const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `ORD-${timestamp}-${random}`;
};

/**
 * Formats date to Polish locale string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats cart items for display
 * @param {Array} cart - Cart items to format
 * @returns {string} Formatted items string
 */
export const formatOrderItems = (cart) => {
  if (!Array.isArray(cart)) return '';
  
  return cart.map(item => 
    `${item.name} (${item.quantity}x po ${formatPrice(item.price)} = ${formatPrice(item.quantity * item.price)})`
  ).join("\n");
};

/**
 * Prepares order data for sheet storage
 * @param {Object} orderData - Order details
 * @param {Object} formData - Customer form data
 * @param {string} paymentStatus - Payment status
 * @returns {Object} Prepared sheet data
 */
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

/**
 * Checks if a value is empty
 * @param {*} value - Value to check
 * @returns {boolean} True if value is empty
 */
export const isEmpty = (value) => {
  return value === null || 
         value === undefined || 
         (typeof value === 'string' && value.trim() === '') ||
         (Array.isArray(value) && value.length === 0) ||
         (typeof value === 'object' && Object.keys(value).length === 0);
};

/**
 * Validates price value
 * @param {number|string} price - Price to validate
 * @returns {boolean} True if price is valid
 */
export const validatePrice = (price) => {
  const number = Number(price);
  return !isNaN(number) && number >= 0;
};

/**
 * Cleans phone number by removing spaces and non-numeric characters
 * @param {string} phone - Phone number to clean
 * @returns {string} Cleaned phone number
 */
export const cleanPhoneNumber = (phone) => {
  return phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
};