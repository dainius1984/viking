import React, { useEffect, useState, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Zamknij</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const InPostGeowidget = ({ onPointSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  // Load the CSS once when the component mounts
  useEffect(() => {
    // Add CSS if it doesn't exist
    if (!document.querySelector('link[href*="inpost-geowidget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://sandbox-global-geowidget-sdk.easypack24.net/inpost-geowidget.css';
      document.head.appendChild(link);
    }

    // Cleanup function
    return () => {
      // We don't remove the CSS as it might be used by other instances
    };
  }, []);

  // Handle the modal opening and closing
  useEffect(() => {
    // Define the point selection handler inside the effect to avoid dependency issues
    const handlePointSelectedEffect = (event) => {
      const point = event.detail;
      console.log('Selected point:', point);
      setSelectedPoint(point);
      if (onPointSelected) {
        onPointSelected(point);
      }
      setIsModalOpen(false);
    };

    // Define the widget initialization function inside the effect
    const initializeWidgetEffect = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        
        // Create the custom element
        const widget = document.createElement('inpost-geowidget');
        
        // Log environment variable status
        console.log('Environment variables available:', {
          token: process.env.REACT_APP_INPOST_GEO_TOKEN,
          isDefined: typeof process.env.REACT_APP_INPOST_GEO_TOKEN !== 'undefined',
          length: process.env.REACT_APP_INPOST_GEO_TOKEN?.length,
          test: process.env.REACT_APP_TEST,
          testIsDefined: typeof process.env.REACT_APP_TEST !== 'undefined'
        });
        
        // Set attributes
        widget.setAttribute('id', 'geowidget');
        widget.setAttribute('token', process.env.REACT_APP_INPOST_GEO_TOKEN);
        widget.setAttribute('language', 'pl');
        widget.setAttribute('country', 'PL');
        widget.setAttribute('config', 'parcelCollect');
        widget.setAttribute('onpoint', 'onpointselect');
        
        // Add the widget to the container
        containerRef.current.appendChild(widget);
        
        // Add event listener for point selection
        document.addEventListener('onpointselect', handlePointSelectedEffect);
        
        // Add API access example
        widget.addEventListener('inpost.geowidget.init', (event) => {
          // Reference to api object
          const api = event.detail.api;
          console.log('Geowidget initialized with API:', api);
          // You can call API methods here if needed
          // api.changePosition({ longitude: 20.318968, latitude: 49.731131 }, 16);
        });
      }
    };

    if (isModalOpen) {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="inpost-geowidget.js"]');
      
      if (!existingScript) {
        // Add Script if it doesn't exist
        const script = document.createElement('script');
        script.src = 'https://sandbox-global-geowidget-sdk.easypack24.net/inpost-geowidget.js';
        script.defer = true;
        
        script.onload = initializeWidgetEffect;
        document.body.appendChild(script);
        
        // Store the script reference
        widgetRef.current = script;
      } else {
        // If script already exists, just initialize the widget
        initializeWidgetEffect();
      }
    }
    
    // Cleanup function
    return () => {
      // We don't remove the script as it might be used by other instances
      // Just remove the event listener
      document.removeEventListener('onpointselect', handlePointSelectedEffect);
    };
  }, [isModalOpen, onPointSelected]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {selectedPoint ? (
          <span>Zmień paczkomat: {selectedPoint.name}</span>
        ) : (
          <span>Wybierz paczkomat</span>
        )}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="h-[600px] w-full">
          <h2 className="text-lg font-medium mb-4">Wybierz paczkomat</h2>
          <div 
            ref={containerRef}
            className="w-full h-[500px]"
            style={{ 
              minHeight: '500px',
              position: 'relative'
            }}
          />
        </div>
      </Modal>

      {selectedPoint && (
        <div className="mt-2 text-sm text-gray-600">
          Wybrany paczkomat: {selectedPoint.name} - {selectedPoint.address}
        </div>
      )}
    </div>
  );
};

export default InPostGeowidget; 