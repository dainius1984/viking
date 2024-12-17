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
    // Dispatch to cart context
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

    // Call the passed onAddToCart prop if it exists
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white p-6 h-[450px] border border-gray-100">
        {/* Image Container */}
        <div className="w-full h-[200px] mb-5 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col w-full flex-grow">
          {/* Product Name - exactly 2 lines with ellipsis */}
          <h3 className="text-[15px] leading-[1.4] text-gray-700 text-center min-h-[48px] max-h-[48px] 
            line-clamp-2 px-2 mb-1 overflow-hidden">
            {product.name}
          </h3>
          
          {product.subtitle && (
            <p className="text-sm text-gray-500 text-center truncate h-[30px] py-1">
              {product.subtitle}
            </p>
          )}
          
          <p className="text-[20px] font-bold text-[#006400] text-center h-[50px] flex items-center justify-center">
            {product.price} zł
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={activeButton === product.id}
              className={`w-full h-[45px] px-5 rounded border-2 border-[#0a683f] font-semibold text-sm
                flex items-center justify-center gap-2 transition-all duration-300 
                ${activeButton === product.id 
                  ? 'bg-[#0a683f] text-white cursor-not-allowed'
                  : 'text-[#0a683f] hover:bg-[#0a683f] hover:text-white hover:-translate-y-0.5 hover:shadow-lg'
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
              className="w-full h-[45px] px-5 rounded border-2 border-gray-600 text-gray-600 
                font-semibold text-sm hover:bg-gray-600 hover:text-white 
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Czytaj więcej
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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