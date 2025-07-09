import React from 'react';
import { Gift, Sparkles } from 'lucide-react';

const PromotionalButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-pulse"></div>
        <div className="relative flex items-center gap-2">
          <Gift className="w-5 h-5" />
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        <span className="font-semibold">Specjalna oferta!</span>
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default PromotionalButton; 