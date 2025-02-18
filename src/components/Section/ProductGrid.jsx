import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
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
    return shuffleArray(products).slice(0, 4);
  }, []);

  const handleAddToCart = useCallback((product) => {
    // First set the visual feedback
    setActiveButton(product.id);
    setShowModal(true);

    // Scroll to top with a slight delay to ensure smooth transition
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Reset visual feedback after delay
    setTimeout(() => {
      setShowModal(false);
      setActiveButton(null);
    }, 2000);
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto my-6 sm:my-8 lg:my-10 px-4 sm:px-5">
      <h2 className="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[#006400]">Nasze Najnowsze Produkty</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 m-0 p-0 w-full">
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
            className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 
              bg-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg 
              shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-2 sm:gap-3 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FaCheckCircle className="text-[#0a683f] text-xl sm:text-2xl" />
            <p className="text-gray-700 m-0 text-sm sm:text-base">
              Produkt dodany do koszyka!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;