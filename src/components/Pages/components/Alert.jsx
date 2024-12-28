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
    <div 
      className="fixed top-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-[9999] animate-fade-in"
    >
      <div className={`relative overflow-hidden rounded-lg shadow-lg ${
        type === 'success' 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-red-50 border border-red-200'
      }`}>
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
              className={`p-1 rounded-full hover:bg-opacity-20 transition-colors flex-shrink-0 ${
                type === 'success' 
                  ? 'hover:bg-green-600 text-green-600' 
                  : 'hover:bg-red-600 text-red-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EnhancedAlert;