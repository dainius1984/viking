import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import ProductModal from '../Pages/ProductModal';
import './ProductCard.css';

const ProductCard = ({ 
  product, 
  activeButton, 
  onAddToCart
}) => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);

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
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <h3 className="product-name">{product.name}</h3>
        {product.subtitle && <p className="product-capsules">{product.subtitle}</p>}
        <p className="product-price">{product.price} zł</p>
        <div className="product-actions">
          <button 
            className={`add-to-cart ${activeButton === product.id ? 'success' : ''}`}
            onClick={handleAddToCart}
            disabled={activeButton === product.id}
          >
            {activeButton === product.id ? (
              <span className="success-text">
                <FaCheckCircle /> Dodano do koszyka
              </span>
            ) : (
              'Dodaj do koszyka'
            )}
          </button>
          <button 
            className="read-more"
            onClick={() => setShowModal(true)}
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