import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../AuthContext';
import { databases, ID } from '../appwrite';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';

const PAYU_CONFIG = {
  posId: '4347473',
  secondKey: '7c47c70b1c394d90c6187af0ce2b69ed',
  clientId: '4347473',
  clientSecret: '0f3db32e266dcd9878e6ef3933f9e2cc',
  apiUrl: 'https://secure.snd.payu.com/api/v2_1/orders',
};

const OrderPage = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState('DPD');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    street: '',
    postal: '',
    city: '',
    phone: '',
    email: '',
    notes: ''
  });

  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const appendToSheet = async (orderData) => {
    try {
      const apiUrl = 'https://healthapi-zvfk.onrender.com/api';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error appending to sheet:', error);
      throw error;
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        status: 'pending',
        total: (totalAmount + 15).toFixed(2),
        createdAt: new Date().toISOString(),
        items: state.cart.map(item => 
          `${item.name} (${item.quantity}x po ${item.price}zł = ${item.quantity * item.price}zł)`
        ).join("\n"),
        shipping,
        ...formData,
      };

      if (user) {
        const appwriteData = {
          userId: user.$id,
          orderNumber: orderData.orderNumber,
          total: orderData.total,
          createdAt: orderData.createdAt,
          items: JSON.stringify(state.cart.map(item => ({
            id: item.id,
            n: item.name,
            q: item.quantity,
            p: item.price,
            img: item.image
          })))
        };

        await databases.createDocument(
          '67545c1800028e002c86',
          '67545c2c001276c2c261',
          ID.unique(),
          appwriteData
        );
      } else {
        const sheetData = {
          "Numer zamowienia": orderData.orderNumber,
          "Data": new Date().toLocaleString('pl-PL'),
          "Status": orderData.status,
          "Suma": orderData.total,
          "Wysylka": orderData.shipping,
          "Imie": formData.firstName,
          "Nazwisko": formData.lastName,
          "Firma": formData.company || '-',
          "Email": formData.email,
          "Telefon": formData.phone,
          "Ulica": formData.street,
          "Kod pocztowy": formData.postal,
          "Miasto": formData.city,
          "Uwagi": formData.notes || '-',
          "Produkty": orderData.items
        };

        await appendToSheet(sheetData);
      }

      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      setNotification('Wystąpił błąd podczas składania zamówienia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
          Zamówienie {user ? '(Zalogowany)' : '(Gość)'}
        </h1>
        
        <div className="mt-6">
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6 lg:gap-10">
            {/* Billing Details Section */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Dane rozliczeniowe</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Imię *" 
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nazwisko *"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <input
                  type="text"
                  name="company"
                  placeholder="Nazwa firmy (opcjonalnie)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <input
                  type="text"
                  name="street"
                  placeholder="Ulica *"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postal"
                    placeholder="Kod pocztowy *"
                    required
                    value={formData.postal}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  
                  <input
                    type="text"
                    name="city"
                    placeholder="Miasto *"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon *"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <textarea
                  name="notes"
                  placeholder="Uwagi do zamówienia"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[100px] resize-y"
                />
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:sticky lg:top-5">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Twoje zamówienie</h2>
                
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  {state.cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <span className="font-medium">
                          {item.name} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} zł
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Suma częściowa</span>
                    <span>{totalAmount.toFixed(2)} zł</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-600">Wysyłka</span>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="shipping"
                        value="DPD"
                        checked={shipping === 'DPD'}
                        onChange={(e) => setShipping(e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      Kurier DPD - 15.00 zł
                    </label>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                    <span>Do zapłaty</span>
                    <span>{(totalAmount + 15).toFixed(2)} zł</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-6 bg-green-800 text-white py-4 px-6 rounded-lg font-semibold transition-all 
                           hover:bg-green-900 focus:ring-4 focus:ring-green-500/20 
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {notification && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}
      </div>
      
      <PreFooter />
      <Footer />
    </>
  );
};

export default OrderPage;