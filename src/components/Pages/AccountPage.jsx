import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { databases } from '../appwrite';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
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
        <div className="p-4">
          {items.map((item, index) => {
            const productDetails = getProductDetails(item.id);
            return (
              <div 
                key={index} 
                className="flex items-center p-2.5 mb-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                onClick={() => openProductModal(productDetails)}
              >
                <div className="w-10 h-10 mr-4">
                  <img 
                    src={productDetails?.image} 
                    alt={item.n}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                  <span className="font-medium text-[0.95rem]">{item.n}</span>
                  <div className="flex gap-4 text-[0.85rem] text-gray-600">
                    <span>Ilość: {item.q}</span>
                    <span>{item.p} zł/szt</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error('Error parsing order items:', error);
      return <p className="text-red-500">Błąd wyświetlania produktów</p>;
    }
  }, [getProductDetails, openProductModal]);

  return (
    <>
      <TopNavBar />
      <Header />
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
                          <h3>Zamówienie #{order.orderNumber}</h3>
                          <span className="text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-5 text-gray-600">
                          <span><strong>Status:</strong> {order.Status}</span>
                          <span><strong>Suma:</strong> {order.total} zł</span>
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
      <PreFooter />
      <Footer />
    </>
  );
};

export default AccountPage;