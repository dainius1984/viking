import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navigation = {
    informacje: [
      { name: 'O nas', href: '/o-nas' },
      { name: 'Regulamin', href: '/regulamin' },
      { name: 'Polityka prywatności', href: '/polityka-prywatnosci' },
      { name: 'Dostawa', href: '/dostawa' },
      { name: 'Zwroty', href: '/zwroty' }
    ],
    kontakt: [
      { name: 'Pomoc', href: '/pomoc' },
      { name: 'Kontakt', href: '/kontakt' },
      { name: 'FAQ', href: '/faq' }
    ]
  };

  return (
    <footer className="bg-[#006400] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Logo & Info */}
          <div className="space-y-8 md:col-span-2 lg:col-span-1">
            <div className="flex justify-center md:justify-start">
              <img
                src="/img/logo.jpg"
                alt="HealthFamily"
                className="h-16 w-auto bg-white rounded-lg p-2"
              />
            </div>
            <div className="space-y-2 text-sm text-center md:text-left">
              <p className="font-semibold">Family Balance</p>
              <p>ul. Przykładowa 123</p>
              <p>00-000 Warszawa</p>
              <p>NIP: 000-000-00-00</p>
            </div>
            <div className="space-y-2 text-sm text-center md:text-left">
              <p>Email: kontakt@familybalance.pl</p>
              <p>Tel: +48 000 000 000</p>
              <p>Pon-Pt: 8:00 - 16:00</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-center md:text-left">Informacje</h3>
            <ul className="space-y-4 text-center md:text-left">
              {navigation.informacje.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-center md:text-left">Kontakt</h3>
            <ul className="space-y-4 text-center md:text-left">
              {navigation.kontakt.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-6 text-center md:text-left">
              Metody płatności
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <img src="/images/payments/blik.svg" alt="Blik" className="h-8 w-auto" />
              <img src="/images/payments/visa.svg" alt="Visa" className="h-8 w-auto" />
              <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-8 w-auto" />
              <img src="/images/payments/przelewy24.svg" alt="Przelewy24" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm text-gray-200">
            © 2024 Family Balance. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;