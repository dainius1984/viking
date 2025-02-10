import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../AuthContext';
import { databases, ID } from '../appwrite';
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
import { initiatePayment } from '../Pages/PaymentService';

const OrderPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState('DPD');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    street: '',
    postal: '',
    city: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (!state.cart || state.cart.length === 0) {
      navigate('/cart');
    }
  }, [state.cart, navigate]);

  if (!state.cart || state.cart.length === 0) {
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

  const { subtotal, discountAmount, total } = calculateTotals(
    state.cart,
    state.isDiscountApplied
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleApplyDiscount = (code) => {
    if (state.isDiscountApplied) {
      setNotification({
        type: 'error',
        message: 'Kod rabatowy został już wykorzystany w tym zamówieniu.'
      });
      return;
    }

    if (validateDiscountCode(code)) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: code });
      setNotification({
        type: 'success',
        message: `Kod rabatowy ${DISCOUNT_CONFIG.percentage}% został pomyślnie zastosowany!`
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Nieprawidłowy kod rabatowy.'
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
      setNotification({
        type: 'error',
        message: errors[0]
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const orderNumber = generateOrderNumber();
      const orderData = {
        orderNumber,
        status: 'pending',
        subtotal: Number(subtotal).toFixed(2),
        total: Number(total).toFixed(2),
        discountApplied: state.isDiscountApplied,
        discountAmount: Number(discountAmount).toFixed(2),
        shippingCost: DISCOUNT_CONFIG.shippingCost.toFixed(2),
        createdAt: new Date().toISOString(),
        items: formatOrderItems(state.cart),
        shipping,
        ...formData,
      };

      // Create backup of order data before payment
      const backupKey = `order_backup_${orderNumber}`;
      localStorage.setItem(backupKey, JSON.stringify(orderData));

      // Prepare payment data
      const paymentData = {
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
        }
      };

      // Initiate payment
      const response = await initiatePayment(paymentData);
      
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }

    } catch (error) {
      console.error('Error creating order:', error);
      
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił błąd podczas składania zamówienia. Prosimy spróbować później.'
      });
    } finally {
      setLoading(false);
    }
  };

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