import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../AuthContext';
import { databases, ID } from '../appwrite';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import './OrderPage.css';

const PAYU_CONFIG = {
  posId: '4347473', // Id punktu płatności
  secondKey: '7c47c70b1c394d90c6187af0ce2b69ed', // Drugi klucz (MD5)
  clientId: '4347473', // Client ID OAuth
  clientSecret: '0f3db32e266dcd9878e6ef3933f9e2cc', // Client Secret OAuth
  apiUrl: 'https://secure.snd.payu.com/api/v2_1/orders', // Testowa bramka PayU
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

  // Calculate total amount
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
      
      console.log('Sending data:', JSON.stringify(orderData, null, 2)); // Log the exact data being sent
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error details
        console.error('Server response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
  
      const result = await response.json();
      return result;
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
        // For logged-in users, save to Appwrite
        const appwriteData = {
          userId: user.$id,
          orderNumber: orderData.orderNumber,
          // Status: orderData.status,
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
        // For non-logged-in users, save to Google Sheets
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

      // Clear cart and redirect regardless of user status
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
    <div className="order-container">
      <h1>Zamówienie {user ? '(Zalogowany)' : '(Gość)'}</h1>
      
      <div className="order-content">
        <form onSubmit={handleSubmitOrder} className="order-form">
          <div className="form-section">
            <h2>Dane rozliczeniowe</h2>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="Imię *" 
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Nazwisko *"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                placeholder="Nazwa firmy (opcjonalnie)"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text" 
                name="street"
                placeholder="Ulica *"
                required
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="postal"
                placeholder="Kod pocztowy *"
                required
                value={formData.postal}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="Miasto *"
                required
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Telefon *"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="notes"
                placeholder="Uwagi do zamówienia"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="order-summary">
            <h2>Twoje zamówienie</h2>
            <div className="order-items">
              {state.cart.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-details">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                  <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                </div>
              ))}
            </div>
             
            <div className="order-totals">
              <div className="subtotal">
                <span>Suma częściowa</span>
                <span>{totalAmount.toFixed(2)} zł</span>
              </div>
              <div className="shipping">
                <span>Wysyłka</span>
                <div className="shipping-options">
                  <label>
                    <input
                      type="radio"
                      name="shipping"
                      value="DPD"
                      checked={shipping === 'DPD'}
                      onChange={(e) => setShipping(e.target.value)}
                    />
                    Kurier DPD - 15.00 zł
                  </label>
                </div>
              </div>
              <div className="total">
                <span>Do zapłaty</span>
                <span>{(totalAmount + 15).toFixed(2)} zł</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-order-btn"
              disabled={loading}
            >
              {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
            </button>
          </div>
        </form>
      </div>
    </div>

    {notification && (
      <div className="notification">
        <span>{notification}</span>
      </div>
    )}
     
    <PreFooter />
    <Footer />
  </>
);
};

export default OrderPage;