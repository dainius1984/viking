import React, { useState, useEffect } from 'react';
import { X, Gift, Star, Sparkles, Mail } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const PromotionalModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } animate-fade-in`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Modal Content - Responsive frame */}
      <div className={`relative w-full max-w-xs sm:max-w-lg bg-white rounded-2xl border border-emerald-100 shadow-xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto flex flex-col ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`} style={{ minHeight: '340px' }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-3 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-emerald-50 transition-all duration-200 shadow group"
          style={{ minWidth: 40, minHeight: 40 }}
          aria-label="Zamknij modal"
        >
          <X className="w-6 h-6 sm:w-4 sm:h-4 text-gray-600 group-hover:text-emerald-700 transition-colors" />
        </button>

        {/* Content */}
        <div className="relative overflow-hidden mt-8 sm:mt-0">
          {/* Decorative Elements */}
          {/* Removed top-left square */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-100/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
          <div className="absolute inset-0 pointer-events-none">
            {/* Subtle sparkles */}
            <Sparkles className="absolute left-8 top-8 text-emerald-100 opacity-20 animate-pulse" />
            <Sparkles className="absolute right-8 bottom-8 text-yellow-100 opacity-10 animate-pulse" />
          </div>
          <div className="relative p-4 sm:p-6">
            {/* Header - More premium */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-yellow-300 rounded-full blur-lg opacity-20 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-emerald-500 to-yellow-400 p-3 rounded-full shadow flex items-center gap-2">
                    <Gift className="w-6 h-6 text-white" />
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-yellow-400 text-emerald-900 shadow border border-yellow-300">GRATIS</span>
                  </div>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  Specjalna Oferta!
                </span>
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-base font-semibold text-gray-700">
                  Wydaj powyżej 300 zł i otrzymaj
                </span>
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
            </div>

            {/* Product Highlight - More premium */}
            <div className="bg-emerald-50/80 rounded-xl p-4 mb-5 border border-emerald-100 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Viva+ <span className="text-emerald-700 font-extrabold">ZA DARMO!</span>
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Naturalny suplement diety opracowany z myślą o zwalczaniu stresu, poprawianiu nastroju i samopoczucia.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full flex items-center my-4">
              <div className="flex-grow border-t border-emerald-100"></div>
              <span className="mx-3 text-xs text-emerald-400 font-bold tracking-widest">KORZYŚCI</span>
              <div className="flex-grow border-t border-emerald-100"></div>
            </div>

            {/* Benefits - More compact grid */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Wartość 125 zł</h4>
                  <p className="text-xs text-gray-600">Za darmo</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Naturalne</h4>
                  <p className="text-xs text-gray-600">100% naturalne</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Wsparcie mózgu</h4>
                  <p className="text-xs text-gray-600">Układ nerwowy</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Antystresowe</h4>
                  <p className="text-xs text-gray-600">Zmniejsza zmęczenie</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full flex items-center my-4">
              <div className="flex-grow border-t border-emerald-100"></div>
              <span className="mx-3 text-xs text-emerald-400 font-bold tracking-widest">NEWSLETTER</span>
              <div className="flex-grow border-t border-emerald-100"></div>
            </div>

            {/* Newsletter Section - More premium */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-center mb-3 flex flex-col items-center">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-lg mb-1">
                  <Mail className="w-5 h-5" /> Bądź na bieżąco!
                </span>
                <p className="text-gray-600 text-sm mb-2">
                  Subskrybuj newsletter i otrzymuj ekskluzywne oferty
                </p>
              </div>
              <NewsletterForm />
            </div>

            {/* Footer - More compact */}
            <div className="text-center mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                * Oferta ważna do wyczerpania zapasów. Viva+ zostanie automatycznie dodany do zamówienia powyżej 300 zł.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.97) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PromotionalModal; 