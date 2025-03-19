// OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../AuthContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import BillingForm from './BillingForm';
import OrderSummary from './OrderSummary';
import { 
  generateOrderNumber,
  calculateTotals,
  formatOrderItems,
  validateForm,
  validateDiscountCode,
  DISCOUNT_CONFIG,
  getShippingCost,
  isEligibleForFreeShipping,
  formatDate,
} from './OrderUtils';
import { initiatePayment } from './PaymentService';

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  company: '',
  street: '',
  postal: '',
  city: '',
  phone: '',
  email: '',
  notes: '',
  shipping: 'DPD' // Default shipping method
};

const OrderPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Redirect if cart is empty
  useEffect(() => {
    if (!state.cart?.length) {
      navigate('/cart');
    }
  }, [state.cart, navigate]);

  // Calculate order totals with shipping
  const { subtotal, discountAmount, total } = calculateTotals(
    state.cart,
    state.isDiscountApplied
  );

  // Notification handler
  const showNotification = (message, type = 'error', duration = 5000) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), duration);
  };

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  // Shipping method handler
  const handleShippingChange = (method) => {
    console.log('Shipping method changed to:', method);
    setFormData(prev => ({
      ...prev,
      shipping: method
    }));
  };

  // Discount code handler
  const handleApplyDiscount = (code) => {
    if (state.isDiscountApplied) {
      showNotification('Kod rabatowy został już wykorzystany w tym zamówieniu.', 'error', 3000);
      return;
    }

    if (validateDiscountCode(code)) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: code });
      showNotification(
        `Kod rabatowy ${DISCOUNT_CONFIG.percentage}% został pomyślnie zastosowany!`,
        'success',
        3000
      );
    } else {
      showNotification('Nieprawidłowy kod rabatowy.', 'error', 3000);
    }
  };

  // Create payment data object
  const createPaymentData = (orderNumber) => {
    const isFreeShipping = isEligibleForFreeShipping(subtotal);
    const shippingCost = isFreeShipping ? 0 : getShippingCost(subtotal, formData.shipping);
    const finalTotal = total + shippingCost;

    return {
      orderData: {
        orderNumber,
        total: finalTotal.toString(),
        cart: state.cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toString(),
          unitPrice: item.price.toString()
        })),
        shipping: formData.shipping,
        shippingCost: shippingCost.toString(),
        discountApplied: state.isDiscountApplied,
        discountAmount: discountAmount.toString(),
        subtotal: subtotal.toString(),
        userId: user?.$id,
        createdAt: new Date().toISOString(),
        paymentStatus: 'PENDING'
      },
      customerData: {
        Imie: formData.firstName?.trim(),
        Nazwisko: formData.lastName?.trim(),
        Email: formData.email?.trim().toLowerCase(),
        Telefon: formData.phone?.trim(),
        Ulica: formData.street?.trim(),
        'Kod pocztowy': formData.postal?.trim(),
        Miasto: formData.city?.trim(),
        Firma: formData.company?.trim() || '',
        Uwagi: formData.notes?.trim() || ''
      },
      isAuthenticated: !!user,
      userId: user?.$id || null,
      shippingDetails: {
        method: formData.shipping,
        cost: shippingCost.toString()
      },
      discountApplied: state.isDiscountApplied,
      discountAmount: discountAmount.toString(),
      discountPercentage: DISCOUNT_CONFIG.percentage
    };
  };

  // Handle order submission
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
      showNotification(errors[0]);
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const orderNumber = generateOrderNumber();
      
      // Store paczkomat data in localStorage if it exists
      if (formData.paczkomat) {
        console.log('Storing paczkomat data in localStorage with key:', `paczkomat_data_${orderNumber}`);
        console.log('Paczkomat data being stored:', formData.paczkomat);
        localStorage.setItem(`paczkomat_data_${orderNumber}`, JSON.stringify(formData.paczkomat));
      } else {
        console.log('No paczkomat data in formData to store in localStorage');
        console.log('formData shipping method:', formData.shipping);
        console.log('formData contents:', formData);
        
        // If shipping method is INPOST_PACZKOMATY but no paczkomat data, create dummy data
        if (formData.shipping && formData.shipping.includes('PACZKOMATY')) {
          console.log('Shipping method is INPOST_PACZKOMATY but no paczkomat data, creating dummy data');
          const dummyPaczkomatData = {
            name: 'POP-WAW123',
            address: 'ul. Testowa 123, Warszawa',
            point_id: 'POP-WAW123',
            city: 'Warszawa',
            post_code: '00-001'
          };
          
          // Store the dummy data in localStorage
          localStorage.setItem(`paczkomat_data_${orderNumber}`, JSON.stringify(dummyPaczkomatData));
          console.log('Stored dummy paczkomat data in localStorage');
          
          // Update formData with the dummy paczkomat data
          formData.paczkomat = dummyPaczkomatData;
          formData.paczkomatId = dummyPaczkomatData.point_id;
          console.log('Updated formData with dummy paczkomat data');
        }
      }
      
      // Create basic order data
      const orderData = {
        orderNumber,
        status: 'pending',
        subtotal: Number(subtotal).toFixed(2),
        total: (Number(total) + (isEligibleForFreeShipping(subtotal) ? 0 : getShippingCost(subtotal, formData.shipping))).toFixed(2),
        discountApplied: state.isDiscountApplied,
        discountAmount: Number(discountAmount).toFixed(2),
        shippingCost: (isEligibleForFreeShipping(subtotal) ? 0 : getShippingCost(subtotal, formData.shipping)).toFixed(2),
        createdAt: new Date().toISOString(),
        lastUpdateTime: new Date().toISOString(),
        items: formatOrderItems(state.cart),
        shipping: formData.shipping,
        payuOrderId: null,
        paymentStatus: 'PENDING',
        hasPaczkomatData: !!formData.paczkomat
      };
      
      // Create backup in localStorage
      const backupKey = `order_backup_${orderNumber}`;
      localStorage.setItem(backupKey, JSON.stringify({
        ...orderData,
        backupTime: new Date().toISOString(),
        paymentStatus: 'PENDING'
      }));

      console.log('Creating order:', {
        orderNumber,
        total,
        shipping: formData.shipping,
        isAuthenticated: !!user,
        time: new Date().toISOString()
      });

      const paymentData = createPaymentData(orderNumber);
      
      // Store basic order data for confirmation page in localStorage instead of sessionStorage
      localStorage.setItem('lastOrder', JSON.stringify({
        ...orderData,
        date: formatDate(new Date()),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      }));
      
      try {
        const response = await initiatePayment(paymentData);
        console.log('Payment initiated:', {
          orderNumber,
          payuOrderId: response?.orderId,
          hasRedirectUrl: !!response?.redirectUrl,
          shipping: formData.shipping,
          time: new Date().toISOString()
        });

        if (response && response.redirectUrl) {
          // Update the order data in localStorage before redirect
          localStorage.setItem('lastOrder', JSON.stringify({
            orderNumber,
            payuOrderId: response.orderId,
            date: new Date().toISOString(),
            status: 'PENDING',
            shipping: formData.shipping,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            hasPaczkomatData: !!formData.paczkomat
          }));

          window.location.href = response.redirectUrl;
        } else {
          throw new Error('Nie otrzymano linku do płatności');
        }
      } catch (paymentError) {
        console.error('Payment initiation error:', {
          message: paymentError.message,
          stack: paymentError.stack,
          time: new Date().toISOString()
        });
        throw new Error(`Problem z inicjacją płatności: ${paymentError.message}`);
      }

    } catch (error) {
      console.error('Order creation error:', {
        message: error.message,
        stack: error.stack,
        time: new Date().toISOString()
      });
      
      showNotification(
        error.message || 'Wystąpił błąd podczas składania zamówienia. Prosimy spróbować później.'
      );
      
      // Ensure loading state is reset even if there's an error
      setLoading(false);
    } finally {
      // This might not execute if redirect happens, so we set loading false in catch block too
      setLoading(false);
    }
  };

  // Notification component
  const NotificationComponent = () => notification && (
    <div className="fixed top-4 right-4 z-50 p-4 rounded shadow-lg bg-red-100 text-red-800 border border-red-300">
      {notification}
    </div>
  );

  // Loading state or empty cart
  if (!state.cart?.length) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show loading spinner when loading
  if (loading) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Przetwarzanie zamówienia...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Main order form render
  return (
    <>
      <TopNavBar />
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Finalizacja zamówienia</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Dane do zamówienia</h2>
                  {user ? (
                    <div className="text-sm bg-green-50 text-green-700 py-1 px-3 rounded-full border border-green-200">
                      <span className="font-medium">{user.name || 'Zalogowany użytkownik'}</span>
                    </div>
                  ) : (
                    <div className="text-sm bg-gray-50 text-gray-500 py-1 px-3 rounded-full border border-gray-200">
                      Zamawiasz jako Gość
                    </div>
                  )}
                </div>
                
                <BillingForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-green-800 text-white rounded-lg font-medium
                      hover:bg-green-900 transition-all duration-200
                      disabled:bg-gray-400 disabled:cursor-not-allowed
                      active:transform active:scale-[0.99]"
                  >
                    {loading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                cart={state.cart}
                subtotal={subtotal}
                discountApplied={state.isDiscountApplied}
                discountAmount={discountAmount}
                discountPercentage={DISCOUNT_CONFIG.percentage}
                total={total}
                shipping={formData.shipping}
                setShipping={handleShippingChange}
                loading={loading}
                onApplyDiscount={handleApplyDiscount}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationComponent />
    </>
  );
};

export default OrderPage;