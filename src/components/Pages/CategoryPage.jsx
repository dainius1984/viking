import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import ProductCard from '../Pages/ProductCard';
import products from '../../Data/products-data';
import categories from '../../Data/category-data';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  const categoryProducts = categorySlug
    ? products.filter(product => product.category === categorySlug)
    : products;

  const handleAddToCart = (product) => {
    setActiveButton(product.id);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      setActiveButton(null);
    }, 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle link clicks to ensure scroll to top
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      <TopNavBar />
      <Header />
      
      {/* Mobile Category Toggle Button */}
      <div className="md:hidden sticky top-0 bg-white z-40 shadow-sm">
        <button
          onClick={toggleSidebar}
          className="w-full py-3 px-5 text-left text-emerald-800 font-medium flex justify-between items-center"
        >
          Kategorie
          <span className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      
          {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4 sm:py-5">
        {/* Main Content Container */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          <aside className={`
            fixed md:static inset-y-0 left-0 
            w-64 md:w-60 md:flex-shrink-0 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            transition-transform duration-300 ease-in-out
            bg-white md:bg-transparent z-40
            p-4 md:p-0
            overflow-y-auto
            md:sticky md:top-20 md:h-fit
          `}>
            {categories.map((category, index) => (
              <div key={index} className="mb-6 md:mb-8 bg-white p-4 md:p-0 rounded-lg md:rounded-none shadow-sm md:shadow-none">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3 md:mb-4">
                  <Link 
                    to={`/category/${category.slug}`}
                    className={`transition-colors duration-300 hover:text-emerald-900 block
                      ${categorySlug === category.slug ? 'text-emerald-900 font-bold' : ''}`}
                    onClick={handleLinkClick}
                  >
                    {category.title}
                  </Link>
                </h3>
                <ul className="space-y-2 md:space-y-2.5">
                  {category.products.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to="#"
                          className={`text-sm text-gray-700 hover:text-emerald-800 transition-colors block py-1
                            ${categorySlug === item.path.split('/').pop() ? 'text-emerald-800 font-semibold' : ''}`}
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-2.5">
                {getCategoryTitle(categorySlug)}
              </h1>
              <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
                <Link to="/" className="text-emerald-800 hover:text-emerald-900" onClick={handleLinkClick}>
                  Strona główna
                </Link> 
                <span>/</span> 
                <span>Suplementy diety</span> 
                <span>/</span> 
                <span className="truncate max-w-[200px]">{getCategoryTitle(categorySlug)}</span>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {categoryProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeButton={activeButton}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed bottom-5 right-5 flex items-center gap-2.5 px-6 py-4 bg-emerald-800 text-white rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CheckCircle className="w-5 h-5" />
            <p>Produkt dodany do koszyka!</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
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