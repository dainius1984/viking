import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import './ProductGrid.css';
import products from '../../Data/products-data';
import { useCart } from '../../context/CartContext';

const ProductGrid = () => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Memoize random products so they don't change on re-renders
  const randomProducts = useMemo(() => {
    return shuffleArray(products).slice(0, 4);
  }, []); // Empty dependency array means this will only run once when component mounts

  const addToCart = (product) => {
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

    // Show success effect
    setActiveButton(product.id);
    setShowModal(true);

    // Hide modal after 2 seconds
    setTimeout(() => {
      setShowModal(false);
      setActiveButton(null);
    }, 2000);
  };

  return (
    <section className="products-section">
      <h2 className="products-title">
        <span className="green-text">Nasze Najnowsze Produkty</span>
      </h2>
      <div className="products-grid">
        {randomProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image"/>
            <h3 className="product-title">{product.name}</h3>
            {product.subtitle && <p className="product-capsules">{product.subtitle}</p>}
            <p className="product-price">{product.price} zł</p>
            <button 
              className={`add-to-cart-btn ${activeButton === product.id ? 'success' : ''}`}
              onClick={() => addToCart(product)}
              disabled={activeButton === product.id}
            >
              {activeButton === product.id ? (
                <span className="success-text">
                  <FaCheckCircle /> Dodano do koszyka
                </span>
              ) : (
                'Dodaj Do Koszyka'
              )}
            </button>
          </div>
        ))}
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
            <p>Produkt dodany do koszyka!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;