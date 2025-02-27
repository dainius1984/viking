import React from 'react';
import { X } from 'lucide-react';

const Omega3InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Jak sprawdzić poziom Omega-3?</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Zamknij"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="prose max-w-none">
            <div className="mb-6 bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
              <h4 className="text-xl font-bold mb-2 flex items-center text-green-800">
                <span className="text-2xl mr-2">🧐</span> 
                Czy wiesz, że możesz sprawdzić swój poziom Omega-3?
              </h4>
              <p className="text-gray-700">
                Twój organizm potrzebuje równowagi między kwasami Omega-3 i Omega-6, aby funkcjonować prawidłowo. 
                <span className="font-semibold">BalanceTest</span> pozwala na precyzyjną analizę poziomu kwasów tłuszczowych we krwi – łatwo i bezpiecznie w domowych warunkach.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-bold mb-3 flex items-center text-gray-800">
                <span className="text-2xl mr-2">📊</span> 
                Dlaczego to ważne?
              </h4>
              <p className="mb-4">
                Brak równowagi między Omega-3 a Omega-6 może prowadzić do przewlekłych stanów zapalnych, które przyczyniają się do powstawania wielu problemów zdrowotnych, takich jak:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Choroby układu sercowo-naczyniowego</strong> – podwyższony poziom cholesterolu LDL, nadciśnienie, miażdżyca</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Problemy ze stawami</strong> – przewlekłe bóle, sztywność, reumatoidalne zapalenie stawów</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Osłabiona odporność</strong> – częstsze infekcje, przewlekłe zmęczenie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Zaburzenia funkcji poznawczych</strong> – problemy z pamięcią, koncentracją, większe ryzyko choroby Alzheimera</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Choroby skóry</strong> – egzema, łuszczyca, trądzik, suchość skóry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 flex-shrink-0">❌</span>
                  <span><strong>Zaburzenia nastroju</strong> – depresja, stany lękowe, wahania emocjonalne</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6 bg-red-50 p-4 rounded-xl">
              <h4 className="text-lg font-bold mb-3 flex items-center text-red-800">
                <span className="text-xl mr-2">🔴</span> 
                Dodatkowo, przewlekłe stany zapalne mogą powodować lokalne dolegliwości bólowe, takie jak:
              </h4>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                  <span>Bóle głowy i migreny</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                  <span>Napięciowe bóle mięśni i ich nadwrażliwość</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                  <span>Bóle kręgosłupa, zwłaszcza w odcinku lędźwiowym i szyjnym</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                  <span>Przewlekłe bóle brzucha związane z zaburzeniami trawiennymi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">✅</span>
                  <span>Bóle menstruacyjne wynikające z nieprawidłowej regulacji stanów zapalnych</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Zamknij
            </button>
            <button
              className="px-6 py-3 bg-[#006400] text-white font-semibold rounded-lg hover:bg-[#008000] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#006400] focus:ring-offset-2 flex items-center"
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