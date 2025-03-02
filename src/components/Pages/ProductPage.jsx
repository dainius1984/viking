import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Heart, ArrowLeft, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';
import products from '../../Data/products-data';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const productId = parseInt(id);
    const productData = products.find(p => p.id === productId);
    
    if (productData) {
      setProduct(productData);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isImageZoomed) {
        setIsImageZoomed(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isImageZoomed && !event.target.closest('.zoom-modal-image')) {
        setIsImageZoomed(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isImageZoomed]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const addToCart = () => {
    if (isAddedToCart || !product) return;

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
    if (isAddedToWishlist || !product) return;

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

  if (!product) {
    return (
      <>
        <TopNavBar />
        <Header />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-800"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-6xl mx-auto px-4 mb-12">
        {/* Breadcrumb Navigation */}
        <div className="py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-900 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Powrót</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg shadow-black/10 overflow-hidden p-6 sm:p-8">
          {/* Product Header */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-8">
            {product.name}
          </h1>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
            {/* Image Section */}
<div className="relative bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-center group">
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain rounded-lg max-h-[500px] cursor-zoom-in hover:scale-105 transition-transform duration-300"
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
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Search size={16} />
                  <span>Powiększ zdjęcie</span>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="space-y-4">
              {/* Price and Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <p className="text-3xl font-bold text-emerald-800">
                  {product.price} zł
                </p>
                <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full">
                  <Check size={18} />
                  <span className="font-medium">Dostępny</span>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="space-y-4 py-6">
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Check size={16} className="text-emerald-800" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">Darmowa dostawa od 300 zł</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Check size={16} className="text-emerald-800" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">Wysyłka w 24h</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Check size={16} className="text-emerald-800" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">14 dni na zwrot</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={addToCart}
                  disabled={isAddedToCart}
                  className={`flex-1 py-4 px-6 rounded-lg text-base font-semibold
                    flex items-center justify-center gap-2 transition-all duration-300 transform
                    ${isAddedToCart 
                      ? 'bg-emerald-800 text-white cursor-not-allowed'
                      : 'bg-emerald-800 text-white hover:bg-emerald-900 hover:scale-[1.02] hover:shadow-lg active:scale-95'
                    }`}
                >
                  {isAddedToCart ? (
                    <span className="flex items-center gap-2">
                      <Check size={20} />
                      Dodano do koszyka
                    </span>
                  ) : (
                    'Dodaj do koszyka'
                  )}
                </button>

                <button 
                  onClick={addToWishlist}
                  disabled={isAddedToWishlist}
                  className={`flex-1 py-4 px-6 rounded-lg border-2 text-base font-semibold
                    flex items-center justify-center gap-2 transition-all duration-300 transform
                    ${isAddedToWishlist
                      ? 'bg-pink-600 border-pink-600 text-white cursor-not-allowed'
                      : 'border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-[1.02] hover:shadow-lg active:scale-95'
                    }`}
                >
                  <Heart size={20} />
                  {isAddedToWishlist ? 'Dodano do ulubionych' : 'Dodaj do ulubionych'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-800">100%</p>
                  <p className="text-sm font-medium text-gray-600">Satysfakcji</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-800">14 dni</p>
                  <p className="text-sm font-medium text-gray-600">Na zwrot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-emerald-800 font-serif mb-4">
              Szczegółowy opis
            </h2>
            <div className="prose max-w-none text-gray-600">
              {product.description}
            </div>
          </div>
        </div>
      </div>

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
              <Check size={20} className="text-emerald-700 flex-shrink-0" />
            )}
            <p className={`whitespace-nowrap ${isAddedToWishlist ? 'text-pink-600' : 'text-emerald-700'}`}>
              {successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default ProductPage;