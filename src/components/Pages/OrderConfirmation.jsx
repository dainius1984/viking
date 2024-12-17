import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import { FaCheckCircle, FaHome, FaFileAlt, FaEnvelope } from 'react-icons/fa';

const OrderConfirmation = () => {
  // Generate a random order number (in real app, this would come from backend)
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Get current date and estimated delivery (example)
  const orderDate = new Date().toLocaleDateString('pl-PL');
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL');

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="order-confirmation">
        <div className="confirmation-content">
          <FaCheckCircle className="success-icon" />
          <h1>Dziękujemy za złożenie zamówienia!</h1>
          <p>Twoje zamówienie zostało przyjęte do realizacji.</p>
          <p>Wkrótce otrzymasz email z potwierdzeniem zamówienia na podany adres.</p>

          <div className="order-details">
            <div className="order-number">
              Numer zamówienia: {orderNumber}
            </div>
            
            <div className="detail-row">
              <span>Data złożenia:</span>
              <span>{orderDate}</span>
            </div>
            
            <div className="detail-row">
              <span>Przewidywana data dostawy:</span>
              <span>{estimatedDelivery}</span>
            </div>
            
            <div className="detail-row">
              <span>Status:</span>
              <span>W trakcie realizacji</span>
            </div>
          </div>

          <div className="actions">
            <Link to="/" className="button primary-button">
              <FaHome />
              Powrót do strony głównej
            </Link>
            
            <Link to="/orders" className="button secondary-button">
              <FaFileAlt />
              Moje zamówienia
            </Link>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
            <FaEnvelope style={{ marginRight: '0.5rem' }} />
            Kopia potwierdzenia została wysłana na Twój adres email
          </p>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default OrderConfirmation;