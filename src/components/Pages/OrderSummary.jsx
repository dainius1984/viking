import React, { useState } from 'react';
import { formatPrice, DISCOUNT_CONFIG } from './OrderUtils';
import { initiatePayment } from './PaymentService';

const OrderSummary = ({ 
  cart = [], 
  subtotal = 0,
  discountApplied,
  discountAmount = 0,
  discountPercentage = 10,
  total = 0,
  shipping = 'DPD', 
  setShipping,
  loading = false,
  onApplyDiscount,
  formData
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleApplyDiscount = () => {
    if (!onApplyDiscount) return;
    onApplyDiscount(discountCode);
    setDiscountCode('');
  };

// Changes to handlePayment in OrderSummary.jsx
const handlePayment = async () => {
  try {
    setPaymentLoading(true);
    
    // Validate form data
    const requiredFields = ['email', 'firstName', 'lastName', 'phone', 'street', 'postal', 'city'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Proszę wypełnić wszystkie wymagane pola: ' + missingFields.join(', '));
      return;
    }

    const paymentData = {
      orderData: {
        orderNumber: generateOrderNumber(),
        cart: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toString()
        })),
        total: total.toString(),
        subtotal: subtotal.toString(),
        shipping,
        discountApplied,
        discountAmount: discountAmount.toString(),
        items: cart.map(item => 
          `${item.name} (${item.quantity}x po ${formatPrice(item.price)})`
        ).join('\n')
      },
      customerData: {
        Imie: formData.firstName?.trim(),
        Nazwisko: formData.lastName?.trim(),
        Email: formData.email?.trim().toLowerCase(),
        Telefon: formData.phone?.trim(),
        Ulica: formData.street?.trim(),
        'Kod pocztowy': formData.postal?.trim(),
        Miasto: formData.city?.trim()
      }
    };

    console.log('Sending payment data:', paymentData);

    const response = await initiatePayment(paymentData);
    
    if (response.redirectUrl) {
      window.location.href = response.redirectUrl;
    } else {
      throw new Error('No redirect URL received');
    }

  } catch (error) {
    console.error('Payment failed:', error);
    alert('Błąd podczas inicjowania płatności: ' + (error.message || 'Spróbuj ponownie później'));
  } finally {
    setPaymentLoading(false);
  }
};
  
  return (
    <div className="lg:sticky lg:top-5">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Twoje zamówienie</h2>
        
        {/* Cart items */}
        <div className="space-y-3 sm:space-y-4 border-b border-gray-100 pb-4 sm:pb-6">
          {cart.map(item => (
            <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex gap-3">
                {/* Product info */}
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Ilość: {item.quantity}
                  </p>
                </div>
                
                {/* Price */}
                <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          <div className="flex justify-between text-sm sm:text-base">
            <span>Suma częściowa:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discountApplied && (
            <div className="flex justify-between text-green-600 text-sm sm:text-base">
              <span>Rabat ({discountPercentage}%):</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm sm:text-base">
            <span>Wysyłka:</span>
            <span>{formatPrice(DISCOUNT_CONFIG.shippingCost)}</span>
          </div>

          {/* Discount code input */}
          {!discountApplied && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Kod zniżki</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Wpisz kod"
                  className="flex-1 p-2 border rounded text-sm sm:text-base"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-3 sm:px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900 text-sm sm:text-base whitespace-nowrap"
                >
                  Zastosuj
                </button>
              </div>
            </div>
          )}

          {/* Shipping options */}
          <div className="space-y-2 pt-4 border-t">
            <label className="flex items-center gap-2 text-sm sm:text-base">
              <input
                type="radio"
                name="shipping"
                value="DPD"
                checked={shipping === 'DPD'}
                onChange={(e) => setShipping(e.target.value)}
                className="w-4 h-4"
              />
              <span>Kurier DPD - {formatPrice(DISCOUNT_CONFIG.shippingCost)}</span>
            </label>
          </div>

          <div className="flex justify-between font-bold text-base sm:text-lg pt-4 border-t">
            <span>Do zapłaty:</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading || paymentLoading}
            className="w-full py-3 bg-green-800 text-white rounded-lg font-medium
              hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed
              text-sm sm:text-base mt-2"
          >
            {loading || paymentLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Przetwarzanie...
              </span>
            ) : (
              'Kupuję i płacę'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;