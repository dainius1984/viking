import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Omega3InfoModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Handle ESC key to close the modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Allow closing by clicking outside the modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-xl my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 md:p-5 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-xl">🧐</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Jak sprawdzić poziom Omega-3?</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Zamknij"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="prose max-w-none">
            <div className="mb-6 bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
              <p className="text-gray-700">
                Twój organizm potrzebuje równowagi między kwasami Omega-3 i Omega-6, aby funkcjonować prawidłowo. 
                <span className="font-semibold"> BalanceTest</span> pozwala na precyzyjną analizę poziomu kwasów tłuszczowych we krwi – łatwo i bezpiecznie w domowych warunkach.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg md:text-xl font-bold mb-3 flex items-center text-gray-800">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                  📊
                </span> 
                Dlaczego to ważne?
              </h4>
              <p className="mb-4">
                Brak równowagi między Omega-3 a Omega-6 może prowadzić do przewlekłych stanów zapalnych, które przyczyniają się do powstawania wielu problemów zdrowotnych, takich jak:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Choroby układu sercowo-naczyniowego</strong> – podwyższony poziom cholesterolu LDL, nadciśnienie, miażdżyca</span>
                </div>
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Problemy ze stawami</strong> – przewlekłe bóle, sztywność, reumatoidalne zapalenie stawów</span>
                </div>
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Osłabiona odporność</strong> – częstsze infekcje, przewlekłe zmęczenie</span>
                </div>
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Zaburzenia funkcji poznawczych</strong> – problemy z pamięcią, koncentracją, większe ryzyko choroby Alzheimera</span>
                </div>
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Choroby skóry</strong> – egzema, łuszczyca, trądzik, suchość skóry</span>
                </div>
                <div className="flex items-start rounded-lg bg-red-50 p-3">
                  <span className="text-red-500 mr-2 flex-shrink-0 mt-0.5">❌</span>
                  <span><strong>Zaburzenia nastroju</strong> – depresja, stany lękowe, wahania emocjonalne</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-red-50 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-3 flex items-center text-red-800">
                <span className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                  🔴
                </span> 
                Dodatkowo, przewlekłe stany zapalne mogą powodować lokalne dolegliwości bólowe, takie jak:
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✅</span>
                  <span>Bóle głowy i migreny</span>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✅</span>
                  <span>Napięciowe bóle mięśni i ich nadwrażliwość</span>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✅</span>
                  <span>Bóle kręgosłupa, zwłaszcza w odcinku lędźwiowym i szyjnym</span>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg">
                  <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✅</span>
                  <span>Przewlekłe bóle brzucha związane z zaburzeniami trawiennymi</span>
                </div>
                <div className="flex items-start bg-green-50 p-3 rounded-lg md:col-span-2">
                  <span className="text-green-500 mr-2 flex-shrink-0 mt-0.5">✅</span>
                  <span>Bóle menstruacyjne wynikające z nieprawidłowej regulacji stanów zapalnych</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onClose}
              className="order-2 sm:order-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Zamknij
            </button>
            <button
              className="order-1 sm:order-2 px-6 py-3 bg-[#006400] text-white font-semibold rounded-lg hover:bg-[#008000] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#006400] focus:ring-offset-2 flex items-center justify-center"
            >
              Zamów BalanceTest
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Omega3InfoModal;