import React, { useState, useEffect } from 'react';
import { 
  formatPrice, 
  DISCOUNT_CONFIG,
  SHIPPING_OPTIONS,
  isEligibleForFreeShipping,
  getShippingCost 
} from './OrderUtils';
import { CartItem } from './CartItem';
import { DiscountInput } from './DiscountInput';
import PaymentButton from '../PaymentButton';

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
  const isFreeShipping = isEligibleForFreeShipping(subtotal);
  
  // Log when shipping option changes
  useEffect(() => {
    console.log('OrderSummary - Current shipping method:', shipping);
  }, [shipping]);

  const handleApplyDiscount = () => {
    if (!onApplyDiscount) return;
    onApplyDiscount(discountCode);
    setDiscountCode('');
  };

  // Handle shipping method change
  const handleShippingChange = (e) => {
    const selectedShipping = e.target.value;
    console.log('OrderSummary - Shipping changed to:', selectedShipping);
    setShipping(selectedShipping);
  };

  const prepareOrderData = () => {
    // Make sure shipping cost is correctly calculated
    const shippingCost = isFreeShipping ? 0 : SHIPPING_OPTIONS[shipping]?.cost || 0;
    const finalTotal = (Number(total) + shippingCost).toFixed(2);
    
    console.log('OrderSummary - Preparing order data with shipping:', shipping);
    
    return {
      date: new Date().toISOString(),
      status: 'new',
      total: finalTotal,
      shipping: shipping, // Explicitly include shipping method
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
      ).join('\n'),
      paymentStatus: 'PENDING',
      lastUpdateTime: new Date().toISOString(),
      shippingCost: shippingCost.toString()
    };
  };

  const renderShippingOptions = () => (
    <div className="space-y-2 pt-4 border-t">
      {isFreeShipping ? (
        <>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="DPD_DAMORWA_WYSYLKA"
              checked={shipping === 'DPD_DAMORWA_WYSYLKA'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier DPD - Darmowa wysyłka</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping" 
              value="DPD_DARMOWA_WYSYLKA"
              checked={shipping === 'DPD_DARMOWA_WYSYLKA'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier DPD - za pobraniem - Darmowa wysyłka</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="INPOST_DARMOWA_WYSYLKA"
              checked={shipping === 'INPOST_DARMOWA_WYSYLKA'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier InPost - Darmowa wysyłka</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="INPOST_PACZKOMATY_DARMOWA_WYSYLKA"
              checked={shipping === 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>InPost Paczkomaty - Darmowa wysyłka</span>
          </label>
        </>
      ) : (
        <>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="DPD"
              checked={shipping === 'DPD'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier DPD - {formatPrice(SHIPPING_OPTIONS.DPD.cost)}</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="DPD_ZA_POBRANIEM"
              checked={shipping === 'DPD_ZA_POBRANIEM'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier DPD - za pobraniem - {formatPrice(SHIPPING_OPTIONS.DPD_ZA_POBRANIEM.cost)}</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="INPOST"
              checked={shipping === 'INPOST'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>Kurier InPost - {formatPrice(SHIPPING_OPTIONS.INPOST.cost)}</span>
          </label>
          <label className="flex items-center gap-2 text-sm sm:text-base">
            <input
              type="radio"
              name="shipping"
              value="INPOST_PACZKOMATY"
              checked={shipping === 'INPOST_PACZKOMATY'}
              onChange={handleShippingChange}
              className="w-4 h-4"
            />
            <span>InPost Paczkomaty - {formatPrice(SHIPPING_OPTIONS.INPOST_PACZKOMATY.cost)}</span>
          </label>
        </>
      )}
      
      {/* Debug indicator in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-2 text-xs text-gray-500">
          Wybrana opcja dostawy: {shipping}
        </div>
      )}
    </div>
  );

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
        <span>{isFreeShipping ? 'Darmowa' : formatPrice(getShippingCost(subtotal, shipping))}</span>
      </div>

      {!isFreeShipping && (
        <div className="text-sm text-gray-600 italic">
          * Darmowa dostawa dla zamówień powyżej {formatPrice(DISCOUNT_CONFIG.freeShippingThreshold)}
        </div>
      )}

      {!discountApplied && (
        <DiscountInput 
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          onApplyDiscount={handleApplyDiscount}
        />
      )}

      {renderShippingOptions()}

      <div className="flex justify-between font-bold text-base sm:text-lg pt-4 border-t">
        <span>Do zapłaty:</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );

  // Calculate the final order data
  const orderData = prepareOrderData();
  
  // Create enhanced formData with shipping included
  const enhancedFormData = {
    ...formData,
    shipping: shipping // Explicitly include shipping in formData
  };

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
          orderData={orderData}
          formData={enhancedFormData}
          loading={loading}
          isDisabled={cart.length === 0}
        />
      </div>
    </div>
  );
};

export default OrderSummary;