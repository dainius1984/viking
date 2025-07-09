import React from 'react';
import { X, Gift } from 'lucide-react';

const VivaPromoModal = ({ open, onClose, missingAmount }) => {
  if (!open) return null;
  const progress = Math.min(100, Math.round(((300 - missingAmount) / 300) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-xs sm:max-w-md bg-white rounded-2xl border border-emerald-100 shadow-xl flex flex-col" style={{ minHeight: '320px', maxHeight: '90vh' }}>
        <button
          onClick={onClose}
          className="sticky top-2 right-2 sm:top-3 sm:right-3 z-10 self-end p-3 sm:p-2 rounded-full bg-white/80 hover:bg-emerald-50 transition-all duration-200 shadow group"
          style={{ minWidth: 40, minHeight: 40 }}
          aria-label="Zamknij modal"
        >
          <X className="w-6 h-6 sm:w-4 sm:h-4 text-gray-600 group-hover:text-emerald-700 transition-colors" />
        </button>
        <div className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-4 pb-4 flex flex-col items-center text-center mt-2 sm:mt-0">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
              <Gift className="w-5 h-5" /> Viva+ ZA DARMO
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Brakuje Ci <span className="text-emerald-700">{missingAmount} zł</span> do darmowego Viva+!</h2>
          <p className="text-gray-600 mb-4 text-sm">Zamów za minimum 300 zł, a otrzymasz Viva+ o wartości 125 zł gratis do swojego zamówienia.</p>
          <div className="w-full mb-2">
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-3 bg-emerald-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0 zł</span>
              <span>300 zł</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-all"
          >
            Zamknij
          </button>
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.97) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default VivaPromoModal; 