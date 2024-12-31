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

// Order confirmation route protection
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
            
            {/* Auth Route */}
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

            {/* Order Routes */}
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationRoute />} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;