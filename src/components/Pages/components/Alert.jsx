import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const EnhancedAlert = ({ type, message, duration = 5000, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex items-start justify-center p-4 z-[9999]">
      <div 
        className={`
          pointer-events-auto
          w-96 max-w-[calc(100vw-2rem)]
          mt-4
          transform transition-all duration-300 ease-out
          translate-y-0 opacity-100
          rounded-lg shadow-lg
          ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
        `}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            {type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium ${
                type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {type === 'success' ? 'Sukces!' : 'Błąd'}
              </h3>
              <p className={`mt-1 text-sm ${
                type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
            </div>
            
            <button
              onClick={onDismiss}
              className={`
                p-1.5 rounded-full 
                transition-colors duration-200
                flex-shrink-0
                ${type === 'success' 
                  ? 'text-green-600 hover:bg-green-100' 
                  : 'text-red-600 hover:bg-red-100'}
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAlert;