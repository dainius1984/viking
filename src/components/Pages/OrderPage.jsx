import React, { useState } from 'react';
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
  appendToSheet, 
  validateForm, 
  calculateTotals,
  formatOrderItems,
  generateOrderNumber,
  prepareSheetData,
  DISCOUNT_CONFIG,
  formatPrice
} from './OrderUtils';

const OrderPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState('DPD');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
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

  const { subtotal, discountAmount, totalBeforeShipping, total } = calculateTotals(
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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
      setNotification(errors[0]);
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      const orderData = {
        orderNumber: generateOrderNumber(),
        status: 'pending',
        subtotal: subtotal.toFixed(2),
        discountApplied: state.isDiscountApplied,
        discountAmount: discountAmount.toFixed(2),
        shippingCost: DISCOUNT_CONFIG.shippingCost.toFixed(2),
        total: total.toFixed(2),
        createdAt: new Date().toISOString(),
        items: formatOrderItems(state.cart),
        shipping,
        ...formData,
      };

      // Create backup of order data
      const backupKey = `order_backup_${orderData.orderNumber}`;
      localStorage.setItem(backupKey, JSON.stringify(orderData));

      if (user) {
        const appwriteData = {
          userId: user.$id,
          orderNumber: orderData.orderNumber,
          subtotal: orderData.subtotal,
          discountApplied: orderData.discountApplied,
          discountAmount: orderData.discountAmount,
          shippingCost: orderData.shippingCost,
          total: orderData.total,
          createdAt: orderData.createdAt,
          items: JSON.stringify(state.cart.map(item => ({
            id: item.id,
            n: item.name,
            q: item.quantity,
            p: item.price,
            img: item.image
          })))
        };

        await databases.createDocument(
          '67545c1800028e002c86',
          '67545c2c001276c2c261',
          ID.unique(),
          appwriteData
        );
      } else {
        const sheetData = prepareSheetData(orderData, formData);
        await appendToSheet(sheetData, setRetryCount);
      }

      localStorage.removeItem(backupKey);
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      
      const errorMessage = error.message.includes('Zbyt wiele zamówień') 
        ? error.message
        : retryCount >= 3
          ? 'Przepraszamy, wystąpił błąd. Prosimy spróbować później lub skontaktować się z obsługą.'
          : 'Wystąpił błąd podczas składania zamówienia. Próbujemy ponownie...';
      
      setNotification(errorMessage);
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
                  shippingCost={DISCOUNT_CONFIG.shippingCost}
                  total={total}
                  shipping={shipping}
                  setShipping={setShipping}
                  loading={loading}
                />
              </div>
            </form>
          </div>

          {notification && (
            <div className="fixed bottom-4 right-4 z-50">
              <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg 
                transform transition-all duration-300 text-sm sm:text-base">
                {notification}
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