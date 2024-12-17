import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import PreFooter from '../Footer/PreFooter';
import Footer from '../Footer/Footer';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  return (
    <>
      <TopNavBar />
      <Header />
      <div className="order-confirmation">
        <div className="confirmation-content">
          <FaCheckCircle className="success-icon" />
          <h1>Dziękujemy za złożenie zamówienia!</h1>
          <p>Twoje zamówienie zostało przyjęte do realizacji.</p>
          <p>Wkrótce otrzymasz email z potwierdzeniem zamówienia.</p>
          <button className="return-btn">
            <Link to="/">Powrót do strony głównej</Link>
          </button>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default OrderConfirmation;