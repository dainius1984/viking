import React, { useState } from 'react';
import { formatPrice, DISCOUNT_CONFIG } from './OrderUtils';
import { CartItem } from './CartItem';
import { DiscountInput } from './DiscountInput';
import PaymentButton from '../PaymentButton';

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

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

  const handleApplyDiscount = () => {
    if (!onApplyDiscount) return;
    onApplyDiscount(discountCode);
    setDiscountCode('');
  };

  // Prepare order data for payment
  const prepareOrderData = () => ({
    orderNumber: generateOrderNumber(),
    date: new Date().toISOString(),
    status: 'new',
    total: total.toString(),
    shipping,
    cart: cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price.toString()
    })),
    subtotal: subtotal.toString(),
    discountApplied,
    discountAmount: discountAmount.toString(),
    items: cart.map(item => 
      `${item.name} (${item.quantity}x po ${formatPrice(item.price)})`
    ).join('\n')
  });

  const renderOrderSummary = () => (
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

      {!discountApplied && (
        <DiscountInput 
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          onApplyDiscount={handleApplyDiscount}
        />
      )}

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
    </div>
  );

  return (
    <div className="lg:sticky lg:top-5 w-full">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Twoje zamówienie</h2>
        
        <div className="space-y-3 sm:space-y-4 border-b border-gray-100 pb-4 sm:pb-6">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {renderOrderSummary()}
        <PaymentButton 
          orderData={prepareOrderData()}
          formData={formData}
          loading={loading}
          isDisabled={cart.length === 0}
        />
      </div>
    </div>
  );
};

export default OrderSummary;