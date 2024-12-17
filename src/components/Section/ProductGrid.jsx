import React, { useMemo, useState } from 'react';
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

  const handleAddToCart = (product) => {
    setActiveButton(product.id);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      setActiveButton(null);
    }, 2000);
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto my-10 px-5">
      <h2 className="text-center text-3xl mb-10">
        <span className="text-[#006400]">Nasze Najnowsze Produkty</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 m-0 p-0 w-full">
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
            className="fixed bottom-8 right-8 bg-white px-10 py-5 rounded-lg 
              shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-3 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FaCheckCircle className="text-[#0a683f] text-2xl" />
            <p className="text-gray-700 m-0 text-base">
              Produkt dodany do koszyka!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ProductCard component with Tailwind styles
const ProductCardComponent = ({ product, activeButton, onAddToCart }) => {
  return (
    <div className="flex flex-col items-center bg-white p-5 m-0 w-full 
      shadow-[0_0_10px_rgba(0,0,0,0.05)]">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full max-w-[200px] h-auto mb-4"
      />
      <h3 className="text-base text-gray-700 my-2.5 text-center">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500 my-1.5 text-center">
        {product.capsules}
      </p>
      <p className="text-lg text-[#006400] font-bold my-4 text-center">
        {product.price} zł
      </p>

      <div className="flex flex-col gap-2.5 w-full mt-auto">
        <button 
          className={`w-full px-5 py-3 border-2 border-[#0a683f] rounded 
            text-sm font-semibold transition-all duration-300 relative overflow-hidden
            flex items-center justify-center gap-2
            ${activeButton === product.id 
              ? 'bg-[#0a683f] text-white pointer-events-none' 
              : 'bg-transparent text-[#0a683f] hover:bg-[#0a683f] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(10,104,63,0.2)]'
            }
            after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 
            after:pointer-events-none after:bg-[radial-gradient(circle,#fff_10%,transparent_10.01%)] 
            after:bg-no-repeat after:bg-center after:scale-[10] after:opacity-0 
            after:transition-[transform_.5s,opacity_1s]
            active:after:scale-0 active:after:opacity-30 active:after:transition-none`}
          onClick={() => onAddToCart(product)}
        >
          {activeButton === product.id ? (
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-base" />
              Dodano do koszyka
            </span>
          ) : (
            'Dodaj do koszyka'
          )}
        </button>

        <button 
          className="w-full px-5 py-3 border-2 border-gray-500 rounded text-sm 
            font-semibold text-gray-500 bg-transparent transition-all duration-300
            hover:bg-gray-500 hover:text-white hover:-translate-y-0.5 
            hover:shadow-[0_2px_8px_rgba(102,102,102,0.2)]"
        >
          Czytaj więcej
        </button>
      </div>
    </div>
  );
};

export { ProductCardComponent };
export default ProductGrid;