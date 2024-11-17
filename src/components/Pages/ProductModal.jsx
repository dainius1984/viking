import React, { useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-product">
          <div className="modal-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-product-info">
            <h2>{product.name}</h2>
            {product.subtitle && <p className="modal-subtitle">{product.subtitle}</p>}
            <p className="modal-price">{product.price} zł</p>
            
            <div className="modal-description">
              <h3>Opis produktu</h3>
              <p>{product.description || 'Brak opisu produktu.'}</p>
            </div>

            {product.properties && (
              <div className="modal-properties">
                {Object.entries(product.properties).map(([key, value]) => (
                  <div key={key} className="property-item">
                    <span className="property-label">{key}:</span>
                    <span className="property-value">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <button className="modal-add-to-cart">
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
