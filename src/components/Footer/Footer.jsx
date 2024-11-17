import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/viking-logo.svg" alt="Viking Nordic Healt" />
          </div>
          <div className="footer-info">
            <div className="company-info">
              <p><strong>Viking Nordic Healt</strong></p>
              <p>ul. Przykładowa 123</p>
              <p>00-000 Warszawa</p>
              <p>NIP: 000-000-00-00</p>
            </div>
            <div className="contact-info">
              <p>Email: kontakt@vikingnordic.pl</p>
              <p>Tel: +48 000 000 000</p>
              <p>Pon-Pt: 8:00 - 16:00</p>
            </div>
          </div>
          <div className="payment-methods">
            <p><strong>Metody płatności:</strong></p>
            <div className="payment-icons">
              {/* Add payment method icons here */}
              <img src="/images/payments/blik.svg" alt="Blik" />
              <img src="/images/payments/visa.svg" alt="Visa" />
              <img src="/images/payments/mastercard.svg" alt="Mastercard" />
              <img src="/images/payments/przelewy24.svg" alt="Przelewy24" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Viking Nordic Healt. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
