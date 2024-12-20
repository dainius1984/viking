import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductModal from '../Pages/ProductModal';

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

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <>
      <div className="relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full min-h-[500px] sm:min-h-[520px] border border-gray-200">
        {/* Image Container */}
        <div className="w-full h-[200px] p-4 flex items-center justify-center bg-white rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info Container */}
        <div className="flex flex-col flex-grow p-6">
          {/* Product Title and Description */}
          <div className="flex-grow space-y-2 text-center">
            <h3 className="text-[16px] font-medium text-gray-800 leading-tight min-h-[48px] line-clamp-2 hover:text-green-800 transition-colors mx-auto">
              {product.name}
            </h3>
            
            {product.subtitle && (
              <p className="text-sm text-gray-600 min-h-[40px] line-clamp-2 mx-auto">
                {product.subtitle}
              </p>
            )}
            
            {/* Price with better visual hierarchy */}
            <div className="mt-4 mb-6">
              <p className="text-2xl font-bold text-green-800 text-center">
                {product.price} <span className="text-xl">zł</span>
              </p>
            </div>
          </div>

          {/* Buttons Container */}
          <div className="space-y-3 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={activeButton === product.id}
              className={`w-full py-3 px-4 rounded-md border-2 border-green-800 font-semibold text-sm
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
              className="w-full py-3 px-4 rounded-md border-2 border-gray-700 text-gray-700 
                font-semibold text-sm hover:bg-gray-700 hover:text-white 
                transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Czytaj więcej
            </button>
          </div>
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