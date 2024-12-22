import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navigation = {
    informacje: [
      { name: 'O nas', href: '/o-nas' },
      { name: 'Regulamin', href: '/regulamin' },
      { name: 'Zamówienia', href: '/category' },
      { name: 'Polityka Prywatności', href: '/policy' }
    ]
  };

  return (
    <footer className="bg-[#006400] text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Company Info */}
          <div>
            <img
              src="/img/logo.jpg"
              alt="HealthFamily"
              className="h-16 w-auto bg-white rounded p-2 mb-6"
            />
            <div className="space-y-1 text-sm">
              <p className="font-semibold">Family Balance</p>
              <p>ul. Przykładowa 123</p>
              <p>00-000 Warszawa</p>
              <p>NIP: 000-000-00-00</p>
            </div>
            <div className="space-y-1 text-sm mt-4">
              <p>Email: kontakt@familybalance.pl</p>
              <p>Tel: +48 000 000 000</p>
              <p>Pon-Pt: 8:00 - 16:00</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informacje</h3>
            <ul className="space-y-2">
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

          {/* Payment Methods */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left w-full">
              Metody płatności
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-2 w-24 h-12 flex items-center justify-center">
                <img 
                  src="/img/logo/Blik.svg" 
                  alt="Blik" 
                  className="h-6 w-auto" 
                />
              </div>
              <div className="bg-white rounded-lg p-2 w-24 h-12 flex items-center justify-center">
                <img 
                  src="/img/logo/Visa.png" 
                  alt="Visa" 
                  className="h-6 w-auto"
                />
              </div>
              <div className="bg-white rounded-lg p-2 w-24 h-12 flex items-center justify-center">
                <img 
                  src="/img/logo/Mastercard.png" 
                  alt="Mastercard" 
                  className="h-6 w-auto"
                />
              </div>
              <div className="bg-white rounded-lg p-2 w-24 h-12 flex items-center justify-center">
                <img 
                  src="/img/logo/PayU.png" 
                  alt="PayU" 
                  className="h-6 w-auto"
                />
              </div>
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