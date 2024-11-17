import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const { state, dispatch } = useCart();

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const moveToCart = (product) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, quantity: 1 } 
    });
    dispatch({ 
      type: 'REMOVE_FROM_WISHLIST', 
      payload: product.id 
    });
  };

  if (state.wishlist.length === 0) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="empty-wishlist">
          <h2>Twoja lista życzeń jest pusta</h2>
          <p>Dodaj produkty do listy życzeń, aby móc je później łatwo odnaleźć.</p>
          <Link to="/" className="return-btn">
            Wróć Do Sklepu
          </Link>
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
      <div className="wishlist-container">
        <h1>Lista życzeń</h1>
        <div className="wishlist-items">
          {state.wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price} zł</p>
              </div>
              <div className="wishlist-item-actions">
                <button 
                  className="move-to-cart"
                  onClick={() => moveToCart(item)}
                >
                  <FaShoppingCart /> Dodaj do koszyka
                </button>
                <button 
                  className="remove-from-wishlist"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Wishlist;