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
        {/* Image Container - Fixed height */}
        <div className="w-full h-[200px] p-4 flex items-center justify-center bg-white rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info Container - Flex grow to push buttons to bottom */}
        <div className="flex flex-col flex-grow p-4">
          {/* Product Details - Fixed heights */}
          <div className="flex-grow">
            <h3 className="text-[15px] leading-tight text-gray-700 font-medium mb-2 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
            
            {product.subtitle && (
              <p className="text-sm text-gray-500 mb-2 line-clamp-2 min-h-[40px]">
                {product.subtitle}
              </p>
            )}
            
            <p className="text-2xl font-bold text-[#006400] my-4">
              {product.price} zł
            </p>
          </div>

          {/* Buttons Container - Always at bottom */}
          <div className="mt-auto space-y-3">
            <button 
              onClick={handleAddToCart}
              disabled={activeButton === product.id}
              className={`w-full py-3 px-4 rounded-md border-2 border-[#0a683f] font-semibold text-sm
                flex items-center justify-center gap-2 transition-all duration-300
                ${activeButton === product.id 
                  ? 'bg-[#0a683f] text-white cursor-not-allowed'
                  : 'text-[#0a683f] hover:bg-[#0a683f] hover:text-white hover:shadow-lg'
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
                transition-all duration-300 hover:shadow-lg"
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