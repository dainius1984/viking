import React from 'react';
import { formatPrice } from './OrderUtils';

const OrderSummary = ({ 
  cart = [], 
  subtotal = 0,
  discountApplied = false,
  discountAmount = 0,
  discountPercentage = 0,
  shippingCost = 15,
  total = 0,
  shipping = 'DPD', 
  setShipping, 
  loading = false
}) => {
  // Ensure values are numbers and not undefined
  const safeSubtotal = Number(subtotal) || 0;
  const safeDiscountAmount = Number(discountAmount) || 0;
  const safeTotal = Number(total) || 0;
  const safeShippingCost = Number(shippingCost) || 0;

  return (
    <div className="lg:sticky lg:top-5">
      <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">Twoje zamówienie</h2>
        
        <div className="space-y-4 border-b border-gray-100 pb-6">
          {Array.isArray(cart) && cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Ilość: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-sm sm:text-base ml-4">
                {formatPrice(Number(item.price) * Number(item.quantity))}
              </span>
            </div>
          ))}
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Suma częściowa</span>
            <span>{formatPrice(safeSubtotal)}</span>
          </div>
          
          {discountApplied && (
            <div className="flex justify-between text-sm sm:text-base text-green-600">
              <span>Rabat ({discountPercentage}%)</span>
              <span>-{formatPrice(safeDiscountAmount)}</span>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <span className="text-sm sm:text-base text-gray-600">Wysyłka</span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="shipping"
                  value="DPD"
                  checked={shipping === 'DPD'}
                  onChange={(e) => setShipping(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                Kurier DPD - {formatPrice(safeShippingCost)}
              </label>
              <label className="flex items-center gap-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="shipping"
                  value="InPost"
                  checked={shipping === 'InPost'}
                  onChange={(e) => setShipping(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                Paczkomat InPost - {formatPrice(safeShippingCost)}
              </label>
              <label className="flex items-center gap-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="shipping"
                  value="Poczta"
                  checked={shipping === 'Poczta'}
                  onChange={(e) => setShipping(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                Poczta Polska - {formatPrice(safeShippingCost)}
              </label>
            </div>
          </div>
          
          <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
            <span>Do zapłaty</span>
            <span>{formatPrice(safeTotal)}</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 bg-green-800 text-white py-3 sm:py-4 px-6 rounded-lg 
            font-semibold transition-all hover:bg-green-900 focus:ring-4 
            focus:ring-green-500/20 disabled:bg-gray-300 disabled:cursor-not-allowed
            text-sm sm:text-base"
          disabled={loading || !Array.isArray(cart) || cart.length === 0}
        >
          {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;