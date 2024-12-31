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
import PrivateRoute, { RedirectIfAuthenticated } from './PrivateRoute';
import ProductPage from './components/Pages/ProductPage';

const CartPersistenceWrapper = ({ children }) => {
  const { user } = useAuth();

  // Effect to handle cart persistence
  React.useEffect(() => {
    if (user) {
      // Load saved cart for authenticated users
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // You could dispatch this to your cart context if needed
        } catch (error) {
          console.error('Error parsing saved cart:', error);
        }
      }
    }
  }, [user]);

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <CartPersistenceWrapper>
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

              {/* Semi-Protected Routes (Allow Guest Access) */}
              <Route 
                path="/order" 
                element={<OrderPage />} 
              />
              <Route 
                path="/order-confirmation" 
                element={<OrderConfirmation />} 
              />

              {/* Catch all route for 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartPersistenceWrapper>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;