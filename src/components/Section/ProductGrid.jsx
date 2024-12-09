import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import './ProductGrid.css';
import products from '../../Data/products-data';
import ProductCard from '../Pages/ProductCard';

const ProductGrid = () => {
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

  // Memoize random products
  const randomProducts = useMemo(() => {
    return shuffleArray(products).slice(0, 3);
  }, []);

  const handleAddToCart = (product) => {
    setActiveButton(product.id);
    setShowModal(true);

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
          <ProductCard
            key={product.id}
            product={product}
            activeButton={activeButton}
            onAddToCart={handleAddToCart}
          />
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