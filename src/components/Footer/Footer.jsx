import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

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
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {/* Company Info with Logo */}
          <div>
            {/* Logo centered above company info */}
            <div className="flex mb-2 ml-12">
              <img
                src="/img/logo.jpg"
                alt="HealthFamily"
                className="h-12 w-auto bg-white rounded p-1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <div className="text-sm">
                  <p className="font-medium">Family Balance</p>
                  <p>ul. Przykładowa 123</p>
                  <p>00-000 Warszawa</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:kontakt@familybalance.pl" 
                   className="text-sm hover:text-white/80 transition-colors">
                  kontakt@familybalance.pl
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+48000000000" 
                   className="text-sm hover:text-white/80 transition-colors">
                  +48 000 000 000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <p className="text-sm">Pon-Pt: 8:00 - 16:00</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Informacje</h3>
            <ul className="space-y-1">
              {navigation.informacje.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-white/80 hover:text-white transition-colors 
                             inline-block transform hover:translate-x-1 duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Metody płatności</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Blik', 'Visa', 'Mastercard', 'PayU'].map((method) => (
                <div key={method} 
                     className="bg-white/5 backdrop-blur-sm border border-white/10 
                              rounded-lg p-2 flex items-center justify-center
                              hover:bg-white/10 transition-colors">
                  <img 
                    src={`/img/logo/${method === 'Visa' ? 'visa' : method}${method === 'Blik' ? '.svg' : '.png'}`}
                    alt={method}
                    className="h-6 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-white/80">
              © 2024 Family Balance. Wszystkie prawa zastrzeżone.
            </p>
            <p className="text-sm text-white/60">
              NIP: 000-000-00-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;