import React, { useState } from 'react';
import { formatPrice, DISCOUNT_CONFIG, validateDiscountCode } from './OrderUtils';

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
  onApplyDiscount // New prop
}) => {
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    if (!onApplyDiscount) return;
    onApplyDiscount(discountCode);
    setDiscountCode('');
  };

  return (
    <div className="lg:sticky lg:top-5">
      <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">Twoje zamówienie</h2>
        
        {/* Cart items */}
        <div className="space-y-4 border-b border-gray-100 pb-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                <div>
                  <p className="font-medium text-sm sm:text-base">{item.name}</p>
                  <p className="text-gray-600 text-sm">Ilość: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4 mt-6">
          <div className="flex justify-between">
            <span>Suma częściowa:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discountApplied && (
            <div className="flex justify-between text-green-600">
              <span>Rabat ({discountPercentage}%):</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Wysyłka:</span>
            <span>{formatPrice(DISCOUNT_CONFIG.shippingCost)}</span>
          </div>

          {/* Discount code input */}
          {!discountApplied && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Kod zniżki</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Wpisz kod"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
                >
                  Zastosuj
                </button>
              </div>
            </div>
          )}

          {/* Shipping options */}
          <div className="space-y-2 pt-4 border-t">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="DPD"
                checked={shipping === 'DPD'}
                onChange={(e) => setShipping(e.target.value)}
              />
              Kurier DPD - {formatPrice(DISCOUNT_CONFIG.shippingCost)}
            </label>
            {/* Add other shipping options */}
          </div>

          <div className="flex justify-between font-bold text-lg pt-4 border-t">
            <span>Do zapłaty:</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-800 text-white rounded-lg font-medium
              hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;