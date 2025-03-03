import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        id: product.id,
        name: product.name,
        price: typeof product.price === 'string' 
          ? parseFloat(product.price.replace(',', '.'))
          : product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      }
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
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5" onClick={onClose}>
      <motion.div 
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="sticky top-5 right-5 float-right text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-300 hover:rotate-90 transform z-10 bg-white/80 p-2 rounded-full shadow-md"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col p-10">
          {/* Responsive layout container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Section */}
            <div className="relative flex flex-col">
              <div className="relative bg-gray-50 p-5 rounded-lg min-h-[300px] md:min-h-[400px] flex items-center justify-center group hover:scale-[1.02] transition-transform duration-300">
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full max-h-[400px] object-contain rounded cursor-zoom-in hover:scale-105 transition-transform duration-300"
                  onClick={handleImageClick}
                  onLoad={handleImageLoad}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
                )}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-2 rounded-full text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Search size={14} />
                  <span>Kliknij aby powiększyć</span>
                </div>
              </div>
              
              {/* Buttons directly under image */}
              <motion.div 
                className="flex gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <button 
                  className={`flex-1 py-2 px-4 rounded border font-medium text-sm
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${isAddedToCart 
                      ? 'bg-green-700 text-white border-green-700 cursor-not-allowed'
                      : 'border-green-700 text-green-700 hover:bg-green-700 hover:text-white'
                    }`}
                  onClick={addToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? (
                    <span className="flex items-center gap-2">
                      <Check size={14} />
                      Dodano do koszyka
                    </span>
                  ) : (
                    'Dodaj do koszyka'
                  )}
                </button>

                <button 
                  className={`flex-1 py-2 px-4 rounded border font-medium text-sm
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${isAddedToWishlist
                      ? 'bg-pink-600 text-white border-pink-600 cursor-not-allowed'
                      : 'border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white'
                    }`}
                  onClick={addToWishlist}
                  disabled={isAddedToWishlist}
                >
                  {isAddedToWishlist ? (
                    <span className="flex items-center gap-2">
                      <Heart size={14} />
                      Dodano do ulubionych
                    </span>
                  ) : (
                    <>
                      <Heart size={14} />
                      Dodaj do ulubionych
                    </>
                  )}
                </button>
              </motion.div>
            </div>
            
            {/* Product Info Section - Basic Info */}
            <div className="product-modal-details">
              <motion.h2
                className="text-2xl text-gray-800 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {product.name}
              </motion.h2>

              {product.subtitle && (
                <motion.p 
                  className="text-gray-600 text-sm mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {product.subtitle}
                </motion.p>
              )}

              <motion.div 
                className="flex items-center justify-between my-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-green-800">
                  {product.price} zł
                </p>
                
                <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Check size={16} className="mr-1" />
                  Dostępny
                </span>
              </motion.div>

              {/* Shipping Benefits */}
              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <div className="flex items-center text-gray-700">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full w-8 h-8 mr-4 flex-shrink-0">
                    <Check size={16} />
                  </span>
                  <span className="text-base">Darmowa dostawa od 300 zł</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-800 rounded-full w-8 h-8 mr-4 flex-shrink-0">
                    <Check size={16} />
                  </span>
                  <span className="text-base">Wysyłka w 24h</span>
                </div>
              </motion.div>

              {/* Satisfaction Guarantee Cards */}
              <motion.div
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Check size={24} className="text-green-700" />
                  </div>
                  <h4 className="text-green-800 font-semibold text-lg mb-2">14 dni na zwrot</h4>
                  <p className="text-green-700 text-sm">Gwarantujemy bezproblemowy zwrot w ciągu 14 dni</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="text-green-800 font-semibold text-lg mb-2">100% satysfakcji</h4>
                  <p className="text-green-700 text-sm">Gwarantujemy najwyższą jakość produktów</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Full width description section that goes below the image and basic info */}
          <motion.div 
            className="mt-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div 
              className="text-gray-600 leading-relaxed product-description-container prose prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description || 'Brak opisu produktu.' }}
            />
          </motion.div>

          {/* Bottom buttons */}
          <motion.div 
            className="flex gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <button 
              className={`flex-1 py-3 px-6 rounded border font-medium
                flex items-center justify-center gap-2 transition-all duration-300
                ${isAddedToCart 
                  ? 'bg-green-700 text-white border-green-700 cursor-not-allowed'
                  : 'border-green-700 text-green-700 hover:bg-green-700 hover:text-white'
                }`}
              onClick={addToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <span className="flex items-center gap-2">
                  <Check size={16} />
                  Dodano do koszyka
                </span>
              ) : (
                'Dodaj do koszyka'
              )}
            </button>

            <button 
              className={`flex-1 py-3 px-6 rounded border font-medium
                flex items-center justify-center gap-2 transition-all duration-300
                ${isAddedToWishlist
                  ? 'bg-pink-600 text-white border-pink-600 cursor-not-allowed'
                  : 'border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white'
                }`}
              onClick={addToWishlist}
              disabled={isAddedToWishlist}
            >
              {isAddedToWishlist ? (
                <span className="flex items-center gap-2">
                  <Heart size={16} />
                  Dodano do ulubionych
                </span>
              ) : (
                <>
                  <Heart size={16} />
                  Dodaj do ulubionych
                </>
              )}
            </button>
          </motion.div>

          {product.properties && (
            <motion.div 
              className="space-y-2 my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {Object.entries(product.properties).map(([key, value]) => (
                <div key={key} className="flex text-sm">
                  <span className="font-semibold text-gray-800 w-32">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div 
            className="fixed inset-0 bg-black/90 flex justify-center items-center z-[60] cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.img 
              className="max-w-[90vw] max-h-[90vh] object-contain rounded"
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

      {/* Success Message */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className={`fixed bottom-5 right-5 bg-white rounded-full shadow-lg py-3 px-6 flex items-center gap-3 z-[70] max-w-xs
              ${isAddedToWishlist ? 'border border-pink-600' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {isAddedToWishlist ? (
              <Heart size={20} className="text-pink-600 flex-shrink-0" />
            ) : (
              <Check size={20} className="text-green-700 flex-shrink-0" />
            )}
            <p className={`whitespace-nowrap ${isAddedToWishlist ? 'text-pink-600' : 'text-green-700'}`}>
              {successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductModal;