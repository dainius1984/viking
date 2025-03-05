import React, { useEffect, useState, useRef, useCallback } from 'react';

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

// Configuration constants
const GEOWIDGET_CONFIG = {
  CSS_URL: 'https://geowidget.inpost-group.com/inpost-geowidget.css',
  JS_URL: 'https://geowidget.inpost-group.com/inpost-geowidget.js',
  LANGUAGE: 'pl',
  COUNTRY: 'PL',
  CONFIG: 'parcelCollect',
  EVENT_NAME: 'onpointselect'
};

const InPostGeowidget = ({ onPointSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const containerRef = useRef(null);
  
  // Load CSS only once when component mounts
  useEffect(() => {
    const loadCSS = () => {
      if (!document.querySelector(`link[href="${GEOWIDGET_CONFIG.CSS_URL}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = GEOWIDGET_CONFIG.CSS_URL;
        document.head.appendChild(link);
      }
    };
    
    loadCSS();
  }, []);
  
  // Handle point selection
  const handlePointSelected = useCallback((event) => {
    const point = event.detail;
    
    // Format the point data for easier use in the order system
    const formattedPoint = {
      name: point.name,
      address: point.address,
      point_id: point.name, // In InPost, name is typically the point_id
      city: point.city || '',
      province: point.province || '',
      post_code: point.post_code || '',
      location: {
        latitude: point.location?.latitude || point.latitude || 0,
        longitude: point.location?.longitude || point.longitude || 0
      },
      // Add any additional fields you need for your order system
      selected_at: new Date().toISOString()
    };
    
    console.log('Selected point details:', formattedPoint);
    
    // Store the formatted point data
    setSelectedPoint(formattedPoint);
    
    // Pass the formatted data to the parent component if callback exists
    if (onPointSelected) {
      onPointSelected(formattedPoint);
    }
    
    // Close the modal
    setIsModalOpen(false);
  }, [onPointSelected]);
  
  // Initialize widget when modal opens
  useEffect(() => {
    if (!isModalOpen) return;
    
    let cleanup = () => {};
    
    const initializeWidget = () => {
      if (!containerRef.current) return;
      
      containerRef.current.innerHTML = '';
      
      // Create widget element
      const widget = document.createElement('inpost-geowidget');
      
      // Set widget attributes
      widget.setAttribute('id', 'geowidget');
      widget.setAttribute('token', process.env.REACT_APP_INPOST_GEO_TOKEN);
      widget.setAttribute('language', GEOWIDGET_CONFIG.LANGUAGE);
      widget.setAttribute('country', GEOWIDGET_CONFIG.COUNTRY);
      widget.setAttribute('config', GEOWIDGET_CONFIG.CONFIG);
      widget.setAttribute('onpoint', GEOWIDGET_CONFIG.EVENT_NAME);
      
      // Add widget to container
      containerRef.current.appendChild(widget);
      
      // Add event listeners
      document.addEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
      
      // API access
      widget.addEventListener('inpost.geowidget.init', (event) => {
        const api = event.detail.api;
        console.log('Geowidget initialized with API:', api);
        
        // You can use the API to set initial position or other configurations
        // For example, center the map on a specific location in Poland:
        // api.changePosition({ longitude: 19.9449799, latitude: 50.0646501 }, 12);
      });
      
      // Define cleanup function
      cleanup = () => {
        document.removeEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
      };
    };
    
    // Load script if needed
    const existingScript = document.querySelector(`script[src="${GEOWIDGET_CONFIG.JS_URL}"]`);
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = GEOWIDGET_CONFIG.JS_URL;
      script.defer = true;
      script.onload = initializeWidget;
      document.body.appendChild(script);
      
      cleanup = () => {
        document.removeEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
      };
    } else {
      initializeWidget();
    }
    
    return cleanup;
  }, [isModalOpen, handlePointSelected]);
  
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
          <p className="font-medium">Wybrany paczkomat:</p>
          <p>{selectedPoint.name} - {selectedPoint.address}</p>
          {selectedPoint.post_code && (
            <p>{selectedPoint.post_code} {selectedPoint.city}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InPostGeowidget; 