import React, { useEffect, useState, useRef, useCallback } from 'react';

// Simple modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
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

const InPostGeowidget = ({ onPointSelected, selectedPoint: externalSelectedPoint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(externalSelectedPoint || null);
  const containerRef = useRef(null);
  const callbackRef = useRef(null);
  
  // Update internal state when external prop changes
  useEffect(() => {
    if (externalSelectedPoint) {
      setSelectedPoint(externalSelectedPoint);
    }
  }, [externalSelectedPoint]);
  
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
  const handlePointSelected = useCallback((point) => {
    console.log('Point selected event received:', point);
    
    if (!point) {
      console.error('No point data received');
      return;
    }
    
    // Format the point data for easier use in the order system
    // Handle case where address might be an object with line1, line2 properties
    const addressString = typeof point.address === 'object' 
      ? `${point.address.line1 || ''} ${point.address.line2 || ''}`.trim()
      : (point.address || '');
    
    const formattedPoint = {
      name: point.name || '',
      address: addressString,
      point_id: point.name || '', // In InPost, name is typically the point_id
      city: point.city || '',
      province: point.province || '',
      post_code: point.post_code || '',
      location: {
        latitude: point.location?.latitude || point.latitude || 0,
        longitude: point.location?.longitude || point.longitude || 0
      },
      // Add any additional fields you need for your order system
      selected_at: new Date().toISOString(),
      // Extract the number from the name (typically the format is "ABC01N")
      number: point.name || ''
    };
    
    console.log('Formatted point data:', formattedPoint);
    
    // Store the formatted point data
    setSelectedPoint(formattedPoint);
    
    // Pass the formatted data to the parent component if callback exists
    if (onPointSelected) {
      console.log('Calling onPointSelected callback with formatted point data');
      onPointSelected(formattedPoint);
    }
    
    // Close the modal
    setIsModalOpen(false);
  }, [onPointSelected]);
  
  // Store the callback in a ref so it can be accessed by the global function
  useEffect(() => {
    callbackRef.current = handlePointSelected;
  }, [handlePointSelected]);
  
  // Set up global callback function for the widget
  useEffect(() => {
    // Create a global callback function that the widget can call
    window.handleInPostPointSelected = (point) => {
      console.log('Global callback called with point:', point);
      if (callbackRef.current) {
        callbackRef.current(point);
      }
    };
    
    return () => {
      // Clean up global callback when component unmounts
      delete window.handleInPostPointSelected;
    };
  }, []);
  
  // Initialize widget when modal opens
  useEffect(() => {
    if (!isModalOpen) {
      console.log('Modal closed, cleaning up');
      return;
    }
    
    console.log('Modal opened, initializing widget');
    
    const initializeWidget = () => {
      if (!containerRef.current) return;
      
      console.log('Initializing widget in container');
      containerRef.current.innerHTML = '';
      
      // Create widget element
      const widget = document.createElement('inpost-geowidget');
      
      // Set widget attributes
      widget.setAttribute('id', 'geowidget');
      widget.setAttribute('token', process.env.REACT_APP_INPOST_GEO_TOKEN);
      widget.setAttribute('language', GEOWIDGET_CONFIG.LANGUAGE);
      widget.setAttribute('country', GEOWIDGET_CONFIG.COUNTRY);
      widget.setAttribute('config', GEOWIDGET_CONFIG.CONFIG);
      widget.setAttribute('onpoint', 'handleInPostPointSelected'); // Use the global function name
      
      console.log('Widget attributes set, onpoint callback: handleInPostPointSelected');
      
      // Add widget to container
      containerRef.current.appendChild(widget);
      
      console.log('Widget added to container');
    };
    
    // Load script if needed
    const existingScript = document.querySelector(`script[src="${GEOWIDGET_CONFIG.JS_URL}"]`);
    
    if (!existingScript) {
      console.log('Loading InPost Geowidget script');
      const script = document.createElement('script');
      script.src = GEOWIDGET_CONFIG.JS_URL;
      script.defer = true;
      script.onload = () => {
        console.log('InPost Geowidget script loaded');
        initializeWidget();
      };
      document.body.appendChild(script);
    } else {
      console.log('InPost Geowidget script already loaded');
      initializeWidget();
    }
  }, [isModalOpen]);
  
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log('Opening InPost Geowidget modal');
          setIsModalOpen(true);
        }}
        className="w-full py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
      >
        {selectedPoint ? (
          <span>Zmień paczkomat: {selectedPoint.name}</span>
        ) : (
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Wybierz paczkomat
          </span>
        )}
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          console.log('Closing InPost Geowidget modal');
          setIsModalOpen(false);
        }}
      >
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
    </div>
  );
};

export default InPostGeowidget; 