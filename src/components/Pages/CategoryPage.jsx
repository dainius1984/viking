import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import ProductModal from './ProductModal';
import ProductCard from './ProductCard';
import products from '../../Data/products-data';
import categories from '../../Data/category-data';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const categoryProducts = categorySlug
    ? products.filter(product => product.category === categorySlug)
    : products;

  const handleAddToCart = (product) => {
    setActiveButton(product.id);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setActiveButton(null);
    }, 2000);
  };

  return (
    <div>
      <TopNavBar />
      <Header />
      
      <div className="category-page-container">
        <aside className="category-sidebar">
          {categories.map((category, index) => (
            <div key={index} className="category-group">
              <h3 className="category-group-title">
                <Link 
                  to={`/category/${category.slug}`}
                  className={categorySlug === category.slug ? 'active' : ''}
                >
                  {category.title}
                </Link>
              </h3>
              <ul className="category-list">
                {category.products.map((item, itemIndex) => {
                  const product = products.find(p => p.name === item.name);
                  return (
                    <li key={itemIndex}>
                      <Link 
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}
                        className={categorySlug === item.path.split('/').pop() ? 'active' : ''}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <main className="category-main">
          <div className="category-header">
            <h1>{getCategoryTitle(categorySlug)}</h1>
            <div className="breadcrumbs">
              <Link to="/">Strona główna</Link> / <span>Suplementy diety</span> / <span>{getCategoryTitle(categorySlug)}</span>
            </div>
          </div>

          <div className="products-grid">
            {categoryProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                activeButton={activeButton}
                onAddToCart={handleAddToCart}
                onReadMore={(product) => {
                  setSelectedProduct(product);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedProduct && showModal && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => {
            setSelectedProduct(null);
            setShowModal(false);
          }}
        />
      )}

      <PreFooter />
      <Footer />

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            className="success-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FaCheckCircle className="success-icon" />
            <p>Produkt dodany do koszyka!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function to get category title
const getCategoryTitle = (slug) => {
  if (!slug) return 'Wszystkie produkty';

  const mainCategory = categories.find(category => category.slug === slug);
  if (mainCategory) return mainCategory.title;

  const parentCategory = categories.find(category => 
    category.items.some(item => item.slug === slug)
  );

  if (parentCategory) {
    const subcategory = parentCategory.items.find(item => item.slug === slug);
    if (subcategory) {
      return subcategory.name;
    }
  }

  return 'Kategoria nie znaleziona';
};

export default CategoryPage;