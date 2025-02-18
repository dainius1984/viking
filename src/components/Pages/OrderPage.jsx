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
  DISCOUNT_CONFIG
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
  notes: ''
};

const OrderPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState('DPD');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Redirect if cart is empty
  useEffect(() => {
    if (!state.cart?.length) {
      navigate('/cart');
    }
  }, [state.cart, navigate]);

  // Calculate order totals
  const { subtotal, discountAmount, total } = calculateTotals(
    state.cart,
    state.isDiscountApplied
  );

  const showNotification = (message, type = 'error', duration = 5000) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), duration);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

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

  const createOrderData = (orderNumber) => ({
    orderNumber,
    status: 'pending',
    subtotal: Number(subtotal).toFixed(2),
    total: Number(total).toFixed(2),
    discountApplied: state.isDiscountApplied,
    discountAmount: Number(discountAmount).toFixed(2),
    shippingCost: DISCOUNT_CONFIG.shippingCost.toFixed(2),
    createdAt: new Date().toISOString(),
    lastUpdateTime: new Date().toISOString(),
    items: formatOrderItems(state.cart),
    shipping,
    payuOrderId: null,
    paymentStatus: 'PENDING',
    ...formData
  });

  const createPaymentData = (orderNumber) => ({
    orderData: {
      orderNumber,
      cart: state.cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price.toString()
      })),
      total: total.toString(),
      subtotal: subtotal.toString(),
      shipping,
      discountApplied: state.isDiscountApplied,
      discountAmount: discountAmount.toString(),
      items: state.cart.map(item => 
        `${item.name} (${item.quantity}x po ${item.price})`
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
    },
    isAuthenticated: !!user,
    userId: user?.id
  });

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
      showNotification(errors[0]);
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      // Generate order number and prepare data
      const orderNumber = generateOrderNumber();
      const orderData = createOrderData(orderNumber);
      
      // Store backup
      const backupKey = `order_backup_${orderNumber}`;
      localStorage.setItem(backupKey, JSON.stringify({
        ...orderData,
        backupTime: new Date().toISOString(),
        paymentStatus: 'PENDING'
      }));

      // Log order creation attempt
      console.log('Creating order:', {
        orderNumber,
        total,
        isAuthenticated: !!user,
        time: new Date().toISOString()
      });

      // Initiate payment
      const paymentData = createPaymentData(orderNumber);
      const response = await initiatePayment(paymentData);
      
      // Log successful payment initiation
      console.log('Payment initiated:', {
        orderNumber,
        payuOrderId: response.orderId,
        hasRedirectUrl: !!response.redirectUrl,
        time: new Date().toISOString()
      });

      if (response.redirectUrl) {
        // Store order reference in session storage
        sessionStorage.setItem('lastOrder', JSON.stringify({
          orderNumber,
          payuOrderId: response.orderId,
          date: new Date().toISOString(),
          status: 'PENDING'
        }));

        // Redirect to payment gateway
        window.location.href = response.redirectUrl;
      } else {
        throw new Error('Nie otrzymano linku do płatności');
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
    } finally {
      setLoading(false);
    }
  };

  // Show loading state if cart is empty
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

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8">
            Zamówienie {user ? '(Zalogowany)' : '(Gość)'}
          </h1>
          
          <div className="mt-4 sm:mt-6">
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6 lg:gap-10">
              <div className="order-2 lg:order-1">
                <BillingForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <OrderSummary
                  cart={state.cart}
                  subtotal={subtotal}
                  discountApplied={state.isDiscountApplied}
                  discountAmount={discountAmount}
                  discountPercentage={DISCOUNT_CONFIG.percentage}
                  total={total}
                  shipping={shipping}
                  setShipping={setShipping}
                  loading={loading}
                  onApplyDiscount={handleApplyDiscount}
                  formData={formData}
                />
              </div>
            </form>
          </div>

          {notification && (
            <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${
              notification ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}>
              <div className={`px-6 py-3 rounded-lg shadow-lg ${
                notification.type === 'error' ? 'bg-red-500' : 'bg-green-600'
              } text-white text-sm sm:text-base`}>
                {notification.message}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;