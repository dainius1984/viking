import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './components/Pages/CategoryPage';
import Cart from './components/Pages/Cart'; // Add this import

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/koszyk" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;