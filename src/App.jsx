// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivateRoute, {RedirectIfAuthenticated} from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/koszyk" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/o-nas" element={<AboutUs />} />
            <Route path="/regulamin" element={<Regulamin />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/article/:id" element={<Article />} />
            <Route 
  path="/auth" 
  element={
    <RedirectIfAuthenticated>
      <AuthPage />
    </RedirectIfAuthenticated>
  } 
/>
            <Route 
              path="/account" 
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;