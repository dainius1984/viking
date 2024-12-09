import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';
import { databases, ID } from '../appwrite';
import { useAuth } from '../AuthContext';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth(); // Add auth
  const navigate = useNavigate(); // Add navigation
  const [removingItems, setRemovingItems] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Add loading state

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
        localStorage.setItem('redirectToCart', 'true');
        navigate('/auth');
        return;
    }

    setIsProcessing(true);
    try {
      // Create a simplified version of cart items
      const simplifiedItems = state.cart.map(item => ({
        id: item.id,
        n: item.name,  // shortened key names to save characters
        q: item.quantity,
        p: item.price
      }));

      const order = {
        userId: user.$id,
        orderNumber: `ORD-${Date.now()}`,
        Status: 'pending',
        total: (state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 15).toFixed(2),
        createdAt: new Date().toISOString(),
        items: JSON.stringify(simplifiedItems)  // Convert to string
      };

      console.log('Attempting to create order:', order);

      const response = await databases.createDocument(
        '67545c1800028e002c86',         
        '67545c2c001276c2c261',         
        ID.unique(),
        order
      );

      if (response.$id) {
        showNotification('Zamówienie zostało złożone pomyślnie');
        dispatch({ type: 'CLEAR_CART' });
        setTimeout(() => {
          navigate('/account');
        }, 2000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      showNotification('Wystąpił błąd podczas składania zamówienia');
  } finally {
      setIsProcessing(false);
  }
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
        <div className="cart-container">
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <h2>Twój koszyk jest pusty</h2>
            <p>
              Wygląda na to, że nie masz jeszcze żadnych produktów w koszyku. 
              Zapraszamy do zapoznania się z naszą ofertą.
            </p>
            <button className="return-btn">
              <Link to="/category">Przejdź Do Sklepu</Link>
            </button>
          </div>
          <ProductGrid />
        </div>
        <PreFooter />
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="cart-container">
        <h1>Koszyk</h1>
        <div className="cart-content">
          <div className="cart-main">
            <div className="cart-items">
              <div className="cart-header">
                <span>Produkt</span>
                <span>Ilość</span>
                <span>Suma</span>
              </div>
              
              {state.cart.map((item) => (
                <div 
                  key={item.id} 
                  className={`cart-item ${removingItems.has(item.id) ? 'removing' : ''}`}
                >
                  <div className="product-info">
                    <button 
                      className="remove-item" 
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    {(item.price * item.quantity).toFixed(2)} zł
                  </div>
                </div>
              ))}
            </div>
            <Link to="/category" className="continue-shopping">
              Powrót Do Sklepu
            </Link>
          </div>
  
          {state.cart.length > 0 && (
            <div className="order-summary">
              <h3>Podsumowanie zamówienia</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Suma częściowa:</span>
                  <span>{totalAmount.toFixed(2)} zł</span>
                </div>
                <div className="summary-row">
                  <span>Dostawa:</span>
                  <span>15.00 zł</span>
                </div>
                <div className="summary-row total">
                  <span>Suma:</span>
                  <span>{(totalAmount + 15).toFixed(2)} zł</span>
                </div>
  
                <div className="coupon-section">
                  <h3>Kod zniżki</h3>
                  <div className="coupon-input">
                    <input type="text" placeholder="Wpisz kod" />
                    <button>Zastosuj Kupon</button>
                  </div>
                </div>
  
                <button 
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Przetwarzanie...' : 'Złóż zamówienie'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
        
      {notification && (
        <div className="notification">
          <FaCheckCircle />
          <span>{notification}</span>
        </div>
      )}
      
      <PreFooter />
      <Footer />
    </>
  );
};

export default Cart;