import React, { useState, useEffect } from 'react';
import { 
  formatPrice, 
  DISCOUNT_CONFIG,
  SHIPPING_OPTIONS,
  isEligibleForFreeShipping,
  getShippingCost,
  formatDate,
  generateOrderNumber,
  cleanPhoneNumber
} from './OrderUtils';
import { CartItem } from './CartItem';
import { DiscountInput } from './DiscountInput';
import PaymentButton from '../PaymentButton';
import InPostGeowidget from '../InPostGeowidget';

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
  const [selectedPaczkomat, setSelectedPaczkomat] = useState(null);
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

  // Handle Paczkomat selection
  const handlePaczkomatSelected = (point) => {
    console.log('Selected Paczkomat:', point);
    setSelectedPaczkomat(point);
    
    // Update formData with selected Paczkomat details
    if (formData) {
      // Store complete paczkomat data
      formData.paczkomat = {
        name: point.name,
        address: point.address,
        point_id: point.point_id || point.name,
        city: point.city || '',
        post_code: point.post_code || '',
        selected_at: point.selected_at || new Date().toISOString()
      };
      
      // Also store just the ID for backward compatibility
      formData.paczkomatId = point.point_id || point.name;
      
      // Automatically select the InPost Paczkomat shipping option
      setShipping('INPOST_PACZKOMATY_DARMOWA_WYSYLKA');
    }
  };

  const prepareOrderData = () => {
    const shippingCost = getShippingCost(subtotal, shipping);
    const finalTotal = total + shippingCost;
    
    // Get paczkomat details if using InPost Paczkomat
    const paczkomatDetails = shipping.includes('PACZKOMATY') && selectedPaczkomat 
      ? `Paczkomat: ${selectedPaczkomat.name} - ${selectedPaczkomat.address}` 
      : '';
    
    return {
      orderNumber: generateOrderNumber(),
      date: formatDate(new Date()),
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: cleanPhoneNumber(formData.phone),
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      shipping: SHIPPING_OPTIONS[shipping] || shipping,
      paczkomatDetails: paczkomatDetails,
      paczkomatId: selectedPaczkomat?.point_id || selectedPaczkomat?.name || '',
      subtotal: subtotal.toString(),
      discount: discountApplied ? discountAmount.toString() : '0',
      total: finalTotal.toString(),
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
            <span>Paczkomaty InPost {isFreeShipping ? '- Darmowa wysyłka' : '- 14.99 zł'}</span>
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

      {/* Render the InPost Paczkomat widget if this option is selected */}
      {renderInPostPaczkomatSection()}
      
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

  // Render InPost Paczkomat section when that shipping option is selected
  const renderInPostPaczkomatSection = () => {
    if (shipping === 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA') {
      return (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h3 className="font-medium text-sm mb-2">Wybierz paczkomat</h3>
          <InPostGeowidget onPointSelected={handlePaczkomatSelected} />
          
          {selectedPaczkomat && (
            <div className="mt-2 text-xs text-gray-600 border-t pt-2">
              <p>Wybrany paczkomat zostanie użyty do dostawy.</p>
            </div>
          )}
        </div>
      );
    }
    return null;
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