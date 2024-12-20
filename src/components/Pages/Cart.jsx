import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';
import { databases, ID } from '../appwrite';
import { useAuth } from '../AuthContext';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handlePlaceOrder = () => {
    navigate('/order');
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

  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="text-center p-8 mx-auto max-w-2xl bg-white rounded-xl shadow-sm">
            <ShoppingCart className="w-20 h-20 mx-auto mb-3 text-emerald-800" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Twój koszyk jest pusty
            </h2>
            <p className="text-base text-gray-600 mb-5 leading-relaxed">
              Wygląda na to, że nie masz jeszcze żadnych produktów w koszyku. 
              Zapraszamy do zapoznania się z naszą ofertą.
            </p>
            <Link 
              to="/category"
              className="inline-block px-8 py-3.5 bg-emerald-800 text-white rounded-lg 
                font-medium transition-all duration-300 hover:bg-emerald-900 
                hover:-translate-y-0.5 hover:shadow-lg"
            >
              Przejdź Do Sklepu
            </Link>
          </div>
          <ProductGrid />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-2xl font-bold mb-6">Koszyk</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8">
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-[2fr,100px,100px] p-4 bg-gray-50 font-semibold">
                <span>Produkt</span>
                <span>Ilość</span>
                <span>Suma</span>
              </div>
              
              {state.cart.map((item) => (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-[2fr,100px,100px] p-5 border-b border-gray-100
                    ${removingItems.has(item.id) ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-2xl text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                    <span>{item.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    {(item.price * item.quantity).toFixed(2)} zł
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/category" 
              className="inline-block px-6 py-3 border border-gray-200 rounded-lg 
                hover:bg-gray-50 transition-colors self-start"
            >
              Powrót Do Sklepu
            </Link>
          </div>

          <div className="lg:sticky lg:top-5 bg-white rounded-lg shadow-sm p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Podsumowanie zamówienia</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span>Suma częściowa:</span>
                <span>{totalAmount.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span>Dostawa:</span>
                <span>15.00 zł</span>
              </div>
              <div className="flex justify-between py-2.5 font-semibold text-lg">
                <span>Suma:</span>
                <span>{(totalAmount + 15).toFixed(2)} zł</span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-semibold mb-3">Kod zniżki</h3>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Wpisz kod" 
                    className="w-full p-2.5 border border-gray-200 rounded-lg"
                  />
                  <button className="w-full p-2.5 bg-green-800 text-white rounded-lg 
                    hover:bg-green-900 transition-colors">
                    Zastosuj Kupon
                  </button>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full px-8 py-3.5 mt-4 bg-emerald-800 text-white rounded-lg 
                  font-medium transition-all duration-300 hover:bg-emerald-900 
                  hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 
                  disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? 'Przetwarzanie...' : 'Złóż zamówienie'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-5 right-5 flex items-center gap-2.5 px-6 py-4 
          bg-emerald-800 text-white rounded-lg shadow-lg z-50 animate-slideIn">
          <CheckCircle className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;