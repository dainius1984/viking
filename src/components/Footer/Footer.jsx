import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  const navigation = {
    informacje: [
      { name: 'O nas', href: '/o-nas' },
      { name: 'Regulamin', href: '/regulamin' },
      { name: 'Zamówienia', href: '/category' },
      { name: 'Polityka Prywatności', href: '/policy' }
    ]
  };

  const paymentMethods = [
    { name: 'Blik', extension: '.svg' },
    { name: 'Visa', extension: '.png' },
    { name: 'Mastercard', extension: '.png' },
    { name: 'PayU', extension: '.png' }
  ];

  const handleImageError = (e) => {
    console.error(`Failed to load image: ${e.target.src}`);
    // Optionally set a fallback image
    // e.target.src = '/img/fallback-logo.png';
  };

  return (
    <footer className="bg-green-800 text-white border-t-4 border-green-700">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info with Logo */}
          <div className="flex flex-col md:items-start">
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-3">
                <MapPin size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg">Family Balance</p>
                  <p className="text-white/90"> ul. Długa 99</p>
                  <p className="text-white/90">41-409 Mysłowice</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-green-400" />
                <a href="mailto:sklep@familybalance.pl" 
                   className="text-white/90 hover:text-white hover:underline transition-colors">
                  sklep@familybalance.pl
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={24} className="text-green-400" />
                <a href="tel:+48533813285" 
                   className="text-white/90 hover:text-white hover:underline transition-colors">
                  +48 533 813 285
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={24} className="text-green-400" />
                <p className="text-white/90">Pon-Pt: 8:00 - 16:00</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:items-start">
            <h3 className="text-xl font-semibold mb-6">Informacje</h3>
            <ul className="space-y-3 w-full">
              {navigation.informacje.map((item) => (
                <li key={item.name} className="group">
                  <Link 
                    to={item.href}
                    className="text-white/90 hover:text-white flex items-center gap-2
                             transition-colors text-base"
                  >
                    <ChevronRight size={18} className="text-green-400 group-hover:translate-x-1 transition-transform" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-6">Metody płatności</h3>
            <div className="grid grid-cols-2 gap-6">
              {paymentMethods.map(({ name, extension }) => (
                <div key={name} 
                     className="bg-white/10 backdrop-blur-sm border border-white/20 
                              rounded-lg p-4 flex items-center justify-center
                              hover:bg-white/20 transition-colors shadow-lg"
                >
                  <img 
                    src={`/img/logo/${name.toLowerCase()}${extension}`}
                    alt={`${name} payment method`}
                    className="h-8 w-auto object-contain"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base text-white/90">
              © 20255 Family Balance. Wszystkie prawa zastrzeżone.
            </p>
            <p className="text-base font-medium">
              NIP: 222-079-15-71
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;