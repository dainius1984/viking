import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const totalAmount = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.items.length === 0) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="empty-cart">
          <p>Twój koszyk aktualnie jest pusty.</p>
          <button className="return-btn">
            <Link to="/">Wróć Do Sklepu</Link>
          </button>
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
        <div className="cart-items">
          <div className="cart-header">
            <span>Produkt</span>
            <span>Ilość</span>
            <span>Suma</span>
          </div>
          
          {state.items.map((item) => (
            <div key={item.id} className="cart-item">
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

        <div className="cart-summary">
          <div className="coupon-section">
            <h3>Kod zniżki</h3>
            <div className="coupon-input">
              <input type="text" placeholder="Coupon code" />
              <button>Zastosuj Kupon</button>
            </div>
          </div>

          <div className="cart-buttons">
            <Link to="/" className="continue-shopping">
              Powrót Do Sklepu
            </Link>
            <button className="update-cart">
              Zaktualizuj Koszyk
            </button>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Cart;