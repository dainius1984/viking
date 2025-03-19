import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { databases } from '../appwrite';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import { Query } from 'appwrite';
import products from '../../Data/products-data';
import { FaChevronDown } from 'react-icons/fa';
import ProductModal from '../Pages/ProductModal';
import EnhancedAlert from './components/Alert';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  const getProductDetails = useCallback((productId) => {
    // Try to find product by ID first
    let product = products.find(p => p.id === productId || p.id === parseInt(productId));
    
    // If not found, try to find by name match
    if (!product && typeof productId === 'string') {
      product = products.find(p => 
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, '') === 
        productId.toLowerCase().replace(/[^a-z0-9]+/g, '')
      );
    }
    
    return product;
  }, []);

  const toggleOrder = useCallback((orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await databases.listDocuments(
        '67545c1800028e002c86',
        '67545c2c001276c2c261',
        [
          Query.equal('userId', user.$id),
          Query.orderDesc('$createdAt')
        ]
      );
      setOrders(response.documents);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchOrders();
  }, [user, navigate, fetchOrders]);

  useEffect(() => {
    const loginSuccess = sessionStorage.getItem('loginSuccess');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (loginSuccess === 'true' && loginTime) {
      const now = Date.now();
      const loginTimeMs = parseInt(loginTime, 10);
      
      if (now - loginTimeMs < 3000) {
        setShowLoginSuccess(true);
        
        sessionStorage.removeItem('loginSuccess');
        sessionStorage.removeItem('loginTime');
        
        const timer = setTimeout(() => {
          setShowLoginSuccess(false);
        }, 5000);
        
        return () => clearTimeout(timer);
      } else {
        sessionStorage.removeItem('loginSuccess');
        session.removeItem('loginTime');
      }
    }
  }, []);

  const handleDismissSuccess = () => {
    setShowLoginSuccess(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const openProductModal = useCallback((productDetails) => {
    if (productDetails) {
      setSelectedProduct(productDetails);
      setShowModal(true);
    }
  }, []);

  const parseOrderItems = useCallback((orderItems) => {
    try {
      // If orderItems is already an array, return it
      if (Array.isArray(orderItems)) return orderItems;
      
      // If it's a string but not JSON, try to parse it as a product string
      if (typeof orderItems === 'string' && !orderItems.startsWith('[')) {
        const match = orderItems.match(/(.*?)\s*\((\d+)x po\s*([\d.]+)/);
        if (match) {
          const [_, name, quantity, price] = match;
          return [{
            id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            n: name.trim(),
            p: parseFloat(price),
            q: parseInt(quantity),
          }];
        }
      }
      
      // Try parsing as JSON
      return JSON.parse(orderItems);
    } catch (error) {
      console.error('Error parsing order items:', error);
      return [];
    }
  }, []);

  const renderOrderItems = useCallback((orderItems) => {
    const parsedItems = parseOrderItems(orderItems);
    
    if (!parsedItems || parsedItems.length === 0) {
      return <p className="text-red-500 p-4">Brak szczegółów zamówienia</p>;
    }

    return (
      <div className="p-4 space-y-3">
        {parsedItems.map((item, index) => {
          const productDetails = getProductDetails(item.id);
          return (
            <div 
              key={index} 
              className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer 
                        hover:bg-gray-50 transition-all duration-200 hover:translate-x-1 hover:shadow-sm"
              onClick={() => openProductModal(productDetails)}
            >
              <div className="w-12 h-12 mr-4 flex-shrink-0">
                <img 
                  src={productDetails?.image || `/img/products/${item.id}.png`}
                  alt={item.n || item.name}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/img/placeholder.png';
                  }}
                />
              </div>
              <div className="flex-grow flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <span className="font-medium text-gray-800">
                  {item.n || item.name}
                </span>
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>Ilość: {item.q || item.quantity}</span>
                  <span>{(item.p || item.price).toFixed(2)} zł/szt</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [getProductDetails, openProductModal, parseOrderItems]);

  return (
    <>
      <TopNavBar />
      <Header />
      {showLoginSuccess && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <EnhancedAlert
            type="success"
            message="Logowanie zakończone sukcesem! Witamy w Twoim koncie."
            duration={5000}
            onDismiss={handleDismissSuccess}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto my-10 px-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-800 font-semibold">Moje konto</h1>
          <button 
            onClick={handleLogout} 
            className="px-8 py-3.5 bg-emerald-800 text-white rounded-lg font-medium transition-all duration-300 
              shadow-md shadow-emerald-800/20 hover:bg-emerald-900 hover:-translate-y-0.5"
          >
            Wyloguj się
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md shadow-black/5">
            <h2 className="text-2xl text-gray-800 font-semibold mb-5">Informacje o koncie</h2>
            <div className="flex flex-col gap-4">
              <p className="text-lg text-gray-600">
                <strong className="text-gray-800 mr-2">Imię:</strong> {user?.name}
              </p>
              <p className="text-lg text-gray-600">
                <strong className="text-gray-800 mr-2">Email:</strong> {user?.email}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md shadow-black/5">
            <h2 className="text-2xl text-gray-800 font-semibold mb-5">Historia zamówień</h2>
            {loading ? (
              <p>Ładowanie zamówień...</p>
            ) : orders.length > 0 ? (
              <div className="flex flex-col gap-5">
                {orders.map(order => (
                  <div key={order.$id} className="bg-white border border-gray-200 rounded-lg">
                    <div 
                      className="flex justify-between items-center p-5 cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => toggleOrder(order.$id)}
                    >
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                          <h3 className="font-medium">Zamówienie #{order.orderNumber}</h3>
                          <span className="text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-5 text-gray-600">
                          <span><strong>Status:</strong> {order.status || 'W trakcie'}</span>
                          <span><strong>Suma:</strong> {parseFloat(order.total).toFixed(2)} zł</span>
                        </div>
                      </div>
                      <FaChevronDown 
                        className={`text-emerald-800 text-lg ml-4 transition-transform duration-300 
                          ${expandedOrders.has(order.$id) ? 'rotate-180' : ''}`}
                      />
                    </div>
                    {expandedOrders.has(order.$id) && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        {renderOrderItems(order.items)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>Brak historii zamówień</p>
            )}
          </div>
        </div>
      </div>
      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </>
  );
};

export default AccountPage;