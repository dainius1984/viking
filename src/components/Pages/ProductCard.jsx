import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductModal from '../Pages/ProductModal';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
  product = {
    id: '1',
    name: 'Sample Product',
    subtitle: 'Sample Subtitle',
    price: '99.99',
    image: '/api/placeholder/200/200'
  }, 
  activeButton, 
  onAddToCart = () => {}
}) => {
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
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

    // Call the parent's onAddToCart after dispatch
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div className="relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-gray-200">
        {/* Upper area - clickable for navigation */}
        <div 
          className="flex flex-col cursor-pointer"
          onClick={handleProductClick}
        >
          {/* Image Container */}
          <div className="w-full h-[180px] sm:h-[200px] p-4 flex items-center justify-center bg-white rounded-t-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Product Info Container */}
          <div className="p-4 sm:p-5">
            {/* Product Title - Increased height and removed line clamp */}
            <h3 className="text-[15px] sm:text-[17px] font-medium text-gray-800 leading-tight mb-2 text-center hover:text-green-800 transition-colors">
              {product.name}
            </h3>
            
            {/* Subtitle - Adjusted height and removed line clamp */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-gray-600 mb-3 text-center">
                {product.subtitle}
              </p>
            )}
            
            {/* Price with better visual hierarchy */}
            <div className="mb-4">
              <p className="text-xl sm:text-2xl font-bold text-green-800 text-center">
                {product.price} <span className="text-lg sm:text-xl">zł</span>
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Container - Moved up to reduce space */}
        <div className="p-4 sm:p-5 pt-0 mt-auto space-y-2 sm:space-y-3">
          <button 
            onClick={handleAddToCart}
            disabled={activeButton === product.id}
            className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-md border-2 border-green-800 font-semibold text-xs sm:text-sm
              flex items-center justify-center gap-2 transition-all duration-300 transform
              ${activeButton === product.id 
                ? 'bg-green-800 text-white cursor-not-allowed'
                : 'text-green-800 hover:bg-green-800 hover:text-white hover:scale-[1.02] hover:shadow-lg'
              }`}
          >
            {activeButton === product.id ? (
              <>
                <Check size={16} />
                <span>Dodano do koszyka</span>
              </>
            ) : (
              'Dodaj do koszyka'
            )}
          </button>
          
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-md border-2 border-gray-700 text-gray-700 
              font-semibold text-xs sm:text-sm hover:bg-gray-700 hover:text-white 
              transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            Czytaj więcej
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal 
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;