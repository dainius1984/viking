import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../../Data/products-data';
import ProductModal from '../Pages/ProductModal';
import categories from '../../Data/category-data';

const LinkSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Find categories
  const omega3Category = categories.find(c => c.slug === 'suplementy-omega-3');
  const odpornoscCategory = categories.find(c => c.slug === 'suplementy-na-odpornosc');
  const zdrowieCategory = categories.find(c => c.slug === 'suplementy-przywracajace-zdrowie');
  const blonnikCategory = categories.find(c => c.slug === 'blonnik-dla-jelit');
  const testyCategory = categories.find(c => c.slug === 'testy');

  const openProductModal = (productName) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const CategorySection = ({ category, className = '' }) => (
    <div className={className}>
      <Link 
        to={`/category/${category.slug}`} 
        className="block text-[#006400] text-lg md:text-xl font-bold mb-4 
          no-underline hover:underline text-center md:text-left"
        onClick={handleLinkClick}
      >
        {category.title}
      </Link>
      <ul className="list-none p-0 m-0 space-y-3">
        {category.products.map((product, index) => (
          <li key={index}>
            <button 
              className="bg-transparent border-0 text-gray-600 text-[15px] p-0 
                cursor-pointer text-center md:text-left w-full transition-colors 
                duration-200 font-normal hover:text-[#006400] line-clamp-2"
              onClick={() => openProductModal(product.name)}
            >
              {product.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-[28px] font-bold text-black mb-10 
          text-center md:text-left">
          Odkryj nasze produkty:
        </h2>

        {/* Grid Container with improved centering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 
          max-w-5xl mx-auto">
          {/* Column 1: Suplementy omega 3 */}
          {omega3Category && (
            <div className="min-w-0">
              <CategorySection category={omega3Category} />
            </div>
          )}

          {/* Column 2: Suplementy na odporność + Suplementy przywracające zdrowie */}
          <div className="min-w-0 flex flex-col gap-10">
            {odpornoscCategory && (
              <CategorySection category={odpornoscCategory} />
            )}
            {zdrowieCategory && (
              <CategorySection 
                category={zdrowieCategory} 
                className="pt-4 border-t border-gray-100 sm:pt-0 sm:border-t-0"
              />
            )}
          </div>

          {/* Column 3: Błonnik dla jelit + Testy */}
          <div className="min-w-0 flex flex-col gap-10">
            {blonnikCategory && (
              <CategorySection category={blonnikCategory} />
            )}
            {testyCategory && (
              <CategorySection 
                category={testyCategory} 
                className="pt-4 border-t border-gray-100 sm:pt-0 sm:border-t-0"
              />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </section>
  );
};

export default LinkSection;