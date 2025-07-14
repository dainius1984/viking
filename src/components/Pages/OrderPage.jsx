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
  validateForm,
  validateDiscountCode,
  DISCOUNT_CONFIG,
  INITIAL_FORM_STATE,
  showNotification,
  createPaymentData,
  handlePaczkomatStorage,
  createOrderBackup,
  createBasicOrderData,
  renderNotification,
  renderLoadingState,
  handleShippingChange as utilsHandleShippingChange,
  handleInputChange as utilsHandleInputChange
} from './OrderUtils';
import { initiatePayment } from './PaymentService';

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
    state.discount
  );

  // Update notification handler to use the utility function
  const displayNotification = (message, type = 'error', duration = 5000) => {
    showNotification(setNotification, message, type, duration);
  };

  // Form input handler
  const handleInputChange = (e) => {
    utilsHandleInputChange(setFormData, e);
  };

  // Shipping method handler
  const handleShippingChange = (method) => {
    utilsHandleShippingChange(setFormData, method);
  };

  // Discount code handler
  const handleApplyDiscount = (code) => {
    if (state.isDiscountApplied) {
      displayNotification('Kod rabatowy został już wykorzystany w tym zamówieniu.', 'error', 3000);
      return;
    }

    const validation = validateDiscountCode(code);
    if (validation.valid) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { type: validation.type, code: validation.code } });
      if (validation.type === 'percentage') {
        displayNotification(
          `Kod rabatowy ${DISCOUNT_CONFIG.percentage}% został pomyślnie zastosowany!`,
          'success',
          3000
        );
      } else if (validation.type === 'free_shipping') {
        displayNotification(
          'Kod rabatowy na darmową dostawę został pomyślnie zastosowany!',
          'success',
          3000
        );
      }
    } else {
      displayNotification('Nieprawidłowy kod rabatowy.', 'error', 3000);
    }
  };

  // Handle order submission
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
      displayNotification(errors[0]);
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const orderNumber = generateOrderNumber();
      
      // Handle paczkomat data
      const updatedFormData = handlePaczkomatStorage(formData, orderNumber);
      
      // Create basic order data
      const orderData = createBasicOrderData(orderNumber, subtotal, total, state, updatedFormData);
      
      // Create backup in localStorage
      createOrderBackup(orderData, updatedFormData);

      console.log('Creating order:', {
        orderNumber,
        total,
        shipping: updatedFormData.shipping,
        isAuthenticated: !!user,
        time: new Date().toISOString()
      });

      const paymentData = createPaymentData(updatedFormData, state, user, subtotal, total, discountAmount);
      
      try {
        const response = await initiatePayment(paymentData);
        console.log('Payment initiated:', {
          orderNumber,
          payuOrderId: response?.orderId,
          hasRedirectUrl: !!response?.redirectUrl,
          shipping: updatedFormData.shipping,
          time: new Date().toISOString()
        });

        if (response && response.redirectUrl) {
          // Update the order data in localStorage before redirect
          localStorage.setItem('lastOrder', JSON.stringify({
            orderNumber,
            payuOrderId: response.orderId,
            date: new Date().toISOString(),
            status: 'PENDING',
            shipping: updatedFormData.shipping,
            firstName: updatedFormData.firstName,
            lastName: updatedFormData.lastName,
            email: updatedFormData.email,
            phone: updatedFormData.phone,
            hasPaczkomatData: !!updatedFormData.paczkomat,
            cart: state.cart // <-- dodane pole cart
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
      
      displayNotification(
        error.message || 'Wystąpił błąd podczas składania zamówienia. Prosimy spróbować później.'
      );
      
      // Ensure loading state is reset even if there's an error
      setLoading(false);
    } finally {
      // This might not execute if redirect happens, so we set loading false in catch block too
      setLoading(false);
    }
  };

  // Loading state or empty cart
  if (!state.cart?.length) {
    return (
      <>
        <TopNavBar />
        <Header />
        {renderLoadingState("Ładowanie...")}
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
        {renderLoadingState("Przetwarzanie zamówienia...")}
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
              {/* User status banner at the top */}
              {user && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800">
                    Jesteś zalogowany jako <span className="font-semibold">{user.name || 'Użytkownik'}</span>
                  </span>
                </div>
              )}
              
              <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-6">Dane do rozliczenia</h2>
                
                {!user && (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Zamawiasz jako <span className="font-medium">Gość</span></span>
                  </div>
                )}
                
                <BillingForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
                
                {/* <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-green-800 text-white rounded-lg font-medium
                      hover:bg-green-900 transition-all duration-200
                      disabled:bg-gray-400 disabled:cursor-not-allowed
                      active:transform active:scale-[0.99]"
                  >
                    {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
                  </button>
                </div> */}
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
                discount={state.discount}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {renderNotification(notification)}
    </>
  );
};

export default OrderPage;