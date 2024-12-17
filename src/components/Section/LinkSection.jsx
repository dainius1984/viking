import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="max-w-[1200px] mx-auto my-10 sm:my-8 px-5">
      <h2 className="text-2xl sm:text-[28px] font-bold text-black mb-8 
        pl-0 md:pl-5 text-center md:text-left">
        Zobacz więcej:
      </h2>

      <div className="flex flex-col md:flex-row md:justify-start gap-8 md:gap-10 
        px-0 md:px-5">
        {categories.map((category) => (
          <div key={category.slug} className="flex-none min-w-0 md:min-w-[180px] 
            text-center md:text-left">
            <Link 
              to={`/category/${category.slug}`} 
              className="block text-[#006400] text-xl font-bold mb-3 
                no-underline hover:underline"
            >
              {category.title}
            </Link>
            <ul className="list-none p-0 m-0">
              {category.products.slice(0, 4).map((product, index) => (
                <li key={index} className="mb-2.5">
                  <button 
                    className="bg-transparent border-0 text-gray-600 text-[15px] p-0 
                      cursor-pointer text-center md:text-left w-full transition-colors 
                      duration-200 font-normal hover:text-[#006400]"
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