import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaHeart, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        if (isImageZoomed) {
          setIsImageZoomed(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (event) => {
      if (isImageZoomed && !event.target.closest('.zoom-modal-image')) {
        setIsImageZoomed(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isImageZoomed]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const addToCart = () => {
    if (isAddedToCart) return;

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
    if (isAddedToWishlist) return;

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
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-product">
          <div className="modal-product-image">
            <motion.img 
              src={product.image} 
              alt={product.name}
              onClick={handleImageClick}
              onLoad={handleImageLoad}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && (
              <div className="image-loading-placeholder" />
            )}
            <div className="zoom-hint">
              <FaSearch />
              <span>Kliknij aby powiększyć</span>
            </div>
          </div>
          
          <div className="modal-product-info">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {product.name}
            </motion.h2>

            {product.subtitle && (
              <motion.p 
                className="modal-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {product.subtitle}
              </motion.p>
            )}

            <motion.p 
              className="modal-price"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {product.price} zł
            </motion.p>
            
            <motion.div 
              className="modal-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3>Opis produktu</h3>
              <p>{product.description || 'Brak opisu produktu.'}</p>
            </motion.div>

            {product.properties && (
              <motion.div 
                className="modal-properties"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {Object.entries(product.properties).map(([key, value]) => (
                  <div key={key} className="property-item">
                    <span className="property-label">{key}:</span>
                    <span className="property-value">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div 
              className="modal-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
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
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div 
            className="zoom-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.img 
              className="zoom-modal-image"
              src={product.image} 
              alt={product.name}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message Animation */}
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