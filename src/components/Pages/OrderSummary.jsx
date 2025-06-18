import React, { useState, useEffect } from 'react';
import { 
  formatPrice, 
  DISCOUNT_CONFIG,
  SHIPPING_OPTIONS,
  getShippingCost,
  formatDate,
  generateOrderNumber,
  cleanPhoneNumber,
  calculateTotals
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
  total = 0,  // This is now without shipping
  shipping = 'DPD', 
  setShipping,
  loading = false,
  onApplyDiscount,
  formData,
  discount
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [selectedPaczkomat, setSelectedPaczkomat] = useState(null);
  const { isFreeShipping } = calculateTotals(cart, discount);
  
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
    console.log('OrderSummary - handlePaczkomatSelected called with point:', point);
    
    // Ensure point is an object before proceeding
    if (!point || typeof point !== 'object') {
      console.error('Invalid point data received:', point);
      return;
    }
    
    // Create a sanitized copy of the point data
    const sanitizedPoint = {
      name: point.name || '',
      address: point.address || '',
      point_id: point.point_id || point.name || '',
      city: point.city || '',
      post_code: point.post_code || '',
      selected_at: point.selected_at || new Date().toISOString()
    };
    
    console.log('OrderSummary - Sanitized point data:', sanitizedPoint);
    
    // Update state with the selected paczkomat
    setSelectedPaczkomat(sanitizedPoint);
    console.log('OrderSummary - Updated selectedPaczkomat state');
    
    // Update formData with selected Paczkomat details
    if (formData) {
      // Store complete paczkomat data
      formData.paczkomat = sanitizedPoint;
      
      // Also store just the ID for backward compatibility
      formData.paczkomatId = sanitizedPoint.point_id;
      
      console.log('OrderSummary - Updated formData with paczkomat details');
      
      // Automatically select the InPost Paczkomat shipping option if not already selected
      if (!shipping.includes('PACZKOMATY')) {
        console.log('OrderSummary - Setting shipping to Paczkomat option');
        setShipping(isFreeShipping ? 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA' : 'INPOST_PACZKOMATY');
      }
      
      // Also update the formData shipping field to match
      formData.shipping = shipping;
      console.log('OrderSummary - Updated formData.shipping to:', shipping);
    }
  };

  const shippingCost = getShippingCost(subtotal, shipping, discount);
  const finalTotal = total + shippingCost;  // Add shipping cost here

  const renderOrderSummary = () => (
    <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
      <div className="flex justify-between text-sm sm:text-base">
        <span>Suma częściowa:</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* Only show Rabat row for percentage discount */}
      {discount && discount.type === 'percentage' && (
        <div className="flex justify-between text-green-600 text-sm sm:text-base">
          <span>Rabat ({discountPercentage}%):</span>
          <span>-{formatPrice(discountAmount)}</span>
        </div>
      )}

      {/* Show animated free shipping row for wysylka code */}
      {discount && discount.type === 'free_shipping' && (
        <div className="flex justify-between text-green-600 text-sm sm:text-base animate-fadeIn">
          <span className="font-semibold">Darmowa dostawa (kod: wysylka) 🎉</span>
          <span>-{formatPrice(shippingCost)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm sm:text-base">
        <span>Dostawa:</span>
        <span>{isFreeShipping ? 'Darmowa' : formatPrice(shippingCost)}</span>
      </div>

      {!isFreeShipping && (
        <div className="text-sm text-gray-600 italic">
          * Darmowa dostawa dla zamówień powyżej {formatPrice(DISCOUNT_CONFIG.freeShippingThreshold)}
        </div>
      )}

      {!discount && (
        <DiscountInput 
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          onApplyDiscount={handleApplyDiscount}
        />
      )}

      {renderShippingOptions()}

      <div className="flex justify-between font-bold text-base sm:text-lg pt-4 border-t">
        <span>Razem:</span>
        <span>{formatPrice(finalTotal)}</span>
      </div>

      {/* Display selected paczkomat in the order summary */}
      {renderSelectedPaczkomatSummary()}
    </div>
  );

  const prepareOrderData = () => {
    // Use the finalTotal that includes shipping
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
      shippingMethod: shipping,
      paczkomatDetails: '',
      paczkomat: null,
      paczkomatId: '',
      subtotal: subtotal.toString(),
      discount: discountApplied ? discountAmount.toString() : '0',
      total: finalTotal.toString(),  // Use finalTotal here
      items: '',
      cart: cart,
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
            <span>Paczkomaty InPost - Darmowa wysyłka</span>
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
            <span>Paczkomaty InPost - {formatPrice(SHIPPING_OPTIONS.INPOST_PACZKOMATY.cost)}</span>
          </label>
        </>
      )}

      {/* Always render the InPost Paczkomat widget if either Paczkomat option is selected */}
      {renderInPostPaczkomatSection()}
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
    if (shipping === 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA' || shipping === 'INPOST_PACZKOMATY') {
      return (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h3 className="font-medium text-sm mb-2">Wybierz paczkomat</h3>
          <InPostGeowidget 
            onPointSelected={handlePaczkomatSelected} 
            selectedPoint={selectedPaczkomat}
          />
          
          {!selectedPaczkomat && (
            <div className="mt-2 text-xs text-red-600">
              <p>Proszę wybrać paczkomat przed kontynuowaniem zamówienia.</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Add a function to display the selected paczkomat in the order summary
  const renderSelectedPaczkomatSummary = () => {
    if ((shipping === 'INPOST_PACZKOMATY_DARMOWA_WYSYLKA' || shipping === 'INPOST_PACZKOMATY') && selectedPaczkomat) {
      return (
        <div className="mt-3 pt-3 border-t border-dashed">
          <div className="text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-medium">Wybrany paczkomat:</p>
            </div>
            <div className="ml-7">
              <p className="font-bold">{selectedPaczkomat.name || ''}</p>
              <p className="text-xs">{typeof selectedPaczkomat.address === 'string' ? selectedPaczkomat.address : ''}</p>
              {selectedPaczkomat.post_code && (
                <p className="text-xs">{selectedPaczkomat.post_code || ''} {selectedPaczkomat.city || ''}</p>
              )}
            </div>
          </div>
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