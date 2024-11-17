import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const addToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' 
        ? parseFloat(product.price.replace(',', '.'))
        : product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    };
    
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: productToAdd
    });

    setIsAddedToCart(true);
    setShowModal(true);
    setSuccessMessage('Produkt dodany do koszyka!');

    setTimeout(() => {
      setShowModal(false);
      setIsAddedToCart(false);
    }, 2000);
  };

  const addToWishlist = () => {
    dispatch({ 
      type: 'ADD_TO_WISHLIST', 
      payload: product
    });

    setIsAddedToWishlist(true);
    setShowModal(true);
    setSuccessMessage('Produkt dodany do ulubionych!');

    setTimeout(() => {
      setShowModal(false);
      setIsAddedToWishlist(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-product">
          <div className="modal-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-product-info">
            <h2>{product.name}</h2>
            {product.subtitle && <p className="modal-subtitle">{product.subtitle}</p>}
            <p className="modal-price">{product.price} zł</p>
            
            <div className="modal-description">
              <h3>Opis produktu</h3>
              <p>{product.description || 'Brak opisu produktu.'}</p>
            </div>

            {product.properties && (
              <div className="modal-properties">
                {Object.entries(product.properties).map(([key, value]) => (
                  <div key={key} className="property-item">
                    <span className="property-label">{key}:</span>
                    <span className="property-value">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-buttons">
              <button 
                className={`modal-add-to-cart ${isAddedToCart ? 'success' : ''}`}
                onClick={addToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <span className="success-text">
                    <FaCheckCircle /> Dodano do koszyka
                  </span>
                ) : (
                  'Dodaj do koszyka'
                )}
              </button>

              <button 
                className={`modal-add-to-wishlist ${isAddedToWishlist ? 'success' : ''}`}
                onClick={addToWishlist}
                disabled={isAddedToWishlist}
              >
                {isAddedToWishlist ? (
                  <span className="success-text">
                    <FaHeart /> Dodano do ulubionych
                  </span>
                ) : (
                  <>
                    <FaHeart className="heart-icon" />
                    Dodaj do ulubionych
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="success-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FaCheckCircle className="success-icon" />
            <p>{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductModal;
