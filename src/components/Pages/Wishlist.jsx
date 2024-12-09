import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const { state, dispatch } = useCart();

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const addToCart = (item) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        ...item,
        quantity: 1
      }
    });
    removeFromWishlist(item.id);
  };

  if (!state || !state.wishlist) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <FaHeart className="empty-wishlist-icon" />
            <h2>Wystąpił błąd</h2>
            <p>Nie można załadować listy życzeń.</p>
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

  if (state.wishlist.length === 0) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <FaHeart className="empty-wishlist-icon" />
            <h2>Twoja lista życzeń jest pusta</h2>
            <p>
              Wygląda na to, że nie masz jeszcze żadnych produktów w liście życzeń. 
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
      <div className="wishlist-container">
        <h1>Lista życzeń</h1>
        <div className="wishlist-items">
          {state.wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="product-info">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} zł</p>
                </div>
              </div>
              <div className="wishlist-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  <FaShoppingCart /> Dodaj do koszyka
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash /> Usuń
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