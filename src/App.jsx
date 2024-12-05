// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './components/Pages/CategoryPage';
import Cart from './components/Pages/Cart';
import Wishlist from './components/Pages/Wishlist';
import Blog from './components/Pages/Blog';
import Article from './components/Pages/Article'; // Add this import

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} /> {/* Add this route */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;