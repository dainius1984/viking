import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { databases } from '../appwrite';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import './AccountPage.css';
import { Query } from 'appwrite';
import products from '../../Data/products-data';
import { FaChevronDown } from 'react-icons/fa';
import ProductModal from '../Pages/ProductModal';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getProductDetails = useCallback((productId) => {
    return products.find(product => product.id === productId);
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
          Query.equal('userId', user.$id)
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

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const openProductModal = useCallback((productDetails) => {
    setSelectedProduct(productDetails);
    setShowModal(true);
  }, []);

  const renderOrderItems = useCallback((orderItems) => {
    try {
      const items = JSON.parse(orderItems);
      return (
        <div className="order-items-list">
          {items.map((item, index) => {
            const productDetails = getProductDetails(item.id);
            return (
              <div 
                key={index} 
                className="order-item-detail"
                onClick={() => openProductModal(productDetails)}
              >
                <div className="item-image">
                  <img 
                    src={productDetails?.image} 
                    alt={item.n}
                  />
                </div>
                <div className="item-info">
                  <span className="item-name">{item.n}</span>
                  <div className="item-details">
                    <span className="item-quantity">Ilość: {item.q}</span>
                    <span className="item-price">{item.p} zł/szt</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error('Error parsing order items:', error);
      return <p>Błąd wyświetlania produktów</p>;
    }
  }, [getProductDetails, openProductModal]);

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="account-container">
        <div className="account-header">
          <h1>Moje konto</h1>
          <button onClick={handleLogout} className="logout-button">
            Wyloguj się
          </button>
        </div>

        <div className="account-sections">
          <div className="account-section">
            <h2>Informacje o koncie</h2>
            <div className="user-info">
              <p><strong>Imię:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>

          <div className="account-section">
            <h2>Historia zamówień</h2>
            {loading ? (
              <p>Ładowanie zamówień...</p>
            ) : orders.length > 0 ? (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.$id} className="order-item">
                    <div 
                      className="order-header"
                      onClick={() => toggleOrder(order.$id)}
                    >
                      <div className="order-header-content">
                        <div className="order-top">
                          <h3>Zamówienie #{order.orderNumber}</h3>
                          <span className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="order-info">
                          <span><strong>Status:</strong> {order.Status}</span>
                          <span><strong>Suma:</strong> {order.total} zł</span>
                        </div>
                      </div>
                      <FaChevronDown 
                        className={`expand-arrow ${expandedOrders.has(order.$id) ? 'expanded' : ''}`}
                      />
                    </div>
                    {expandedOrders.has(order.$id) && (
                      <div className="order-details">
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
      <PreFooter />
      <Footer />
    </>
  );
};

export default AccountPage;  // Moved outside the component