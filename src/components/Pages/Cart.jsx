import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, CheckCircle, X } from 'lucide-react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';
import { useAuth } from '../AuthContext';
import { 
  DISCOUNT_CONFIG, 
  calculateTotals, 
  formatPrice,
  validateDiscountCode 
} from './OrderUtils';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const showNotification = (message, isSuccess = true) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePlaceOrder = () => {
    if (state.cart.length === 0) {
      showNotification('Twój koszyk jest pusty', false);
      return;
    }
    
    setIsProcessing(true);
    // Small delay to show processing state
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order');
    }, 300);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setRemovingItems(prev => new Set(prev).add(id));
      showNotification('Produkt został usunięty z koszyka');
      setTimeout(() => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        setRemovingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 300);
    } else if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    setRemovingItems(prev => new Set(prev).add(id));
    showNotification('Produkt został usunięty z koszyka');
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const handleApplyDiscount = () => {
    if (state.isDiscountApplied) {
      showNotification('Kod rabatowy został już wykorzystany w tym zamówieniu.', false);
      return;
    }

    if (validateDiscountCode(discountCode)) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: discountCode });
      showNotification(`Kod rabatowy ${DISCOUNT_CONFIG.percentage}% został pomyślnie zastosowany!`);
      setDiscountCode('');
    } else {
      showNotification('Nieprawidłowy kod rabatowy.', false);
    }
  };

  const { subtotal, discountAmount, total } = calculateTotals(state.cart, state.isDiscountApplied);

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {state.cart.length === 0 ? (
          <div className="text-center p-6 sm:p-8 mx-auto max-w-2xl bg-white rounded-xl shadow-sm">
            <ShoppingCart className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3 text-emerald-800" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Twój koszyk jest pusty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
              Wygląda na to, że nie masz jeszcze żadnych produktów w koszyku. 
              Zapraszamy do zapoznania się z naszą ofertą.
            </p>
            <Link 
              to="/category"
              className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-emerald-800 text-white rounded-lg 
                font-medium transition-all duration-300 hover:bg-emerald-900 
                hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base"
            >
              Przejdź Do Sklepu
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Koszyk</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 lg:gap-8">
              <div className="flex flex-col gap-5">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="grid grid-cols-[2fr,80px,80px] sm:grid-cols-[2fr,100px,100px] p-4 bg-gray-50 font-semibold text-sm sm:text-base">
                    <span>Produkt</span>
                    <span className="text-center">Ilość</span>
                    <span className="text-right">Suma</span>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {state.cart.map((item) => (
                      <div 
                        key={item.id} 
                        className={`grid grid-cols-[2fr,80px,80px] sm:grid-cols-[2fr,100px,100px] p-4 sm:p-5
                          ${removingItems.has(item.id) ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                      >
                        <div className="flex items-center gap-2 sm:gap-4">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 p-1"
                            aria-label="Usuń produkt"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                          />
                          <span className="text-sm sm:text-base line-clamp-2">{item.name}</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-200 rounded hover:bg-gray-50 
                              flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-sm sm:text-base">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-200 rounded hover:bg-gray-50
                              flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-end text-sm sm:text-base">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/category" 
                  className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-200 rounded-lg 
                    hover:bg-gray-50 transition-colors self-start text-sm sm:text-base"
                >
                  Powrót Do Sklepu
                </Link>
              </div>

              <div className="lg:sticky lg:top-5 bg-white rounded-lg shadow-sm p-5 sm:p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">Podsumowanie zamówienia</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span>Suma częściowa:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {state.isDiscountApplied && (
                    <div className="flex justify-between py-2.5 border-b border-gray-100 text-green-600">
                      <span>Rabat ({DISCOUNT_CONFIG.percentage}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span>Dostawa:</span>
                    <span>{formatPrice(DISCOUNT_CONFIG.shippingCost)}</span>
                  </div>

                  <div className="flex justify-between py-2.5 font-semibold text-lg">
                    <span>Suma:</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  {!state.isDiscountApplied && (
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="font-semibold mb-3">Kod zniżki</h3>
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Wpisz kod" 
                          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm sm:text-base"
                        />
                        <button 
                          onClick={handleApplyDiscount}
                          className="w-full p-2.5 bg-green-800 text-white rounded-lg 
                            hover:bg-green-900 transition-colors text-sm sm:text-base"
                        >
                          Zastosuj Kupon
                        </button>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full px-6 sm:px-8 py-3 sm:py-3.5 mt-4 bg-emerald-800 text-white rounded-lg 
                      font-medium transition-all duration-300 hover:bg-emerald-900 
                      hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 
                      disabled:cursor-not-allowed disabled:transform-none
                      text-sm sm:text-base"
                  >
                    {isProcessing ? 'Przetwarzanie...' : 'Złóż zamówienie'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Always show ProductGrid */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Nasza Najnowsze produkty</h2>
          <ProductGrid />
        </div>
      </div>

      {notification && (
        <div className={`fixed bottom-5 right-5 flex items-center gap-2.5 px-6 py-4 
          ${notification.isSuccess ? 'bg-emerald-800' : 'bg-red-500'}
          text-white rounded-lg shadow-lg z-50 animate-slideIn text-sm sm:text-base`}
        >
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{notification.message}</span>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;