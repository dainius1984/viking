import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LinkSection.css';
import products from '../../Data/products-data';
import ProductModal from '../Pages/ProductModal';
import categories from '../../Data/category-data';

const LinkSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openProductModal = (productName) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  return (
    <div className="link-section">
      <h2 className="link-section-title">Zobacz więcej:</h2>
      <div className="link-categories">
        {categories.map((category) => (
          <div key={category.slug} className="link-category">
            <Link 
              to={`/category/${category.slug}`} 
              className="category-title hover:text-green-800 transition-colors duration-200"
            >
              {category.title}
            </Link>
            <ul className="link-list">
              {category.products.slice(0, 4).map((product, index) => (
                <li key={index} className="link-item">
                  <button 
                    className="product-link"
                    onClick={() => openProductModal(product.name)}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showModal && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default LinkSection;