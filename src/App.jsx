// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './components/Pages/CategoryPage';
import Cart from './components/Pages/Cart';
import OrderPage from './components/Pages/OrderPage';
import OrderConfirmation from './components/Pages/OrderConfirmation';
import Wishlist from './components/Pages/Wishlist';
import Blog from './components/Pages/Blog';
import Article from './components/Pages/Article';
import AuthPage from './components/Pages/AuthPage';
import AccountPage from './components/Pages/AccountPage';
import Regulamin from './components/Pages/Regulamin';
import { AuthProvider } from './components/AuthContext';
import AboutUs from './components/Pages/About';
import PrivacyPolicy from './components/Pages/Policy';
import PrivateRoute, { RedirectIfAuthenticated } from './PrivateRoute';
import ProductPage from './components/Pages/ProductPage';

// Component to protect order confirmation and handle order session
// Moved outside main App component to be able to use hooks
const OrderConfirmationRoute = () => {
  const location = useLocation();
  const isOrderComplete = sessionStorage.getItem('orderComplete') === 'true';
  
  if (!isOrderComplete && !location.state?.fromOrder) {
    return <Navigate to="/koszyk" replace />;
  }
  
  return <OrderConfirmation />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/koszyk" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/o-nas" element={<AboutUs />} />
            <Route path="/regulamin" element={<Regulamin />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/product/:id" element={<ProductPage />} />
            
            {/* Auth Routes */}
            <Route 
              path="/auth" 
              element={
                <RedirectIfAuthenticated>
                  <AuthPage />
                </RedirectIfAuthenticated>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/account" 
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              } 
            />

            {/* Order Routes - Allow both guest and authenticated users */}
            <Route path="/order" element={<OrderPage />} />
            <Route 
              path="/order-confirmation" 
              element={<OrderConfirmationRoute />} 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;