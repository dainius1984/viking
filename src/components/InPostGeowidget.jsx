import React, { useEffect, useState, useRef, useCallback } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
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
  EVENT_NAME: 'inpost.geowidget.pointselected'
};

const InPostGeowidget = ({ onPointSelected, selectedPoint: externalSelectedPoint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(externalSelectedPoint || null);
  const containerRef = useRef(null);
  
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
  const handlePointSelected = useCallback((event) => {
    console.log('Point selected event received:', event);
    const point = event.detail;
    
    if (!point) {
      console.error('No point data received in event:', event);
      return;
    }
    
    console.log('Raw point data from InPost:', point);
    
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
    
    console.log('Selected point details:', formattedPoint);
    
    // Store the formatted point data
    setSelectedPoint(formattedPoint);
    
    // Pass the formatted data to the parent component if callback exists
    if (onPointSelected && typeof onPointSelected === 'function') {
      try {
        onPointSelected(formattedPoint);
      } catch (error) {
        console.error('Error in onPointSelected callback:', error);
      }
    }
    
    // Close the modal
    setIsModalOpen(false);
  }, [onPointSelected]);
  
  // Initialize widget when modal opens
  useEffect(() => {
    if (!isModalOpen) {
      // Clean up event listener when modal closes
      document.removeEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
      return;
    }
    
    // Register event listener for point selection
    document.removeEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
    document.addEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
    console.log(`Added event listener for ${GEOWIDGET_CONFIG.EVENT_NAME}`);
    
    const initializeWidget = () => {
      if (!containerRef.current) return;
      
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Create widget element
      const widget = document.createElement('inpost-geowidget');
      
      // Set widget attributes
      widget.setAttribute('id', 'geowidget');
      widget.setAttribute('token', process.env.REACT_APP_INPOST_GEO_TOKEN || '');
      widget.setAttribute('language', GEOWIDGET_CONFIG.LANGUAGE);
      widget.setAttribute('country', GEOWIDGET_CONFIG.COUNTRY);
      widget.setAttribute('config', GEOWIDGET_CONFIG.CONFIG);
      widget.setAttribute('onpoint', 'pointselected'); // This is the attribute name expected by the widget
      
      // Add event listener for widget initialization
      widget.addEventListener('inpost.geowidget.init', (event) => {
        console.log('Geowidget initialized:', event);
      });
      
      // Append widget to container
      containerRef.current.appendChild(widget);
      
      console.log('InPost Geowidget initialized');
    };
    
    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${GEOWIDGET_CONFIG.JS_URL}"]`);
    
    if (!existingScript) {
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
    
    return () => {
      // Clean up event listener when component unmounts or modal closes
      document.removeEventListener(GEOWIDGET_CONFIG.EVENT_NAME, handlePointSelected);
      console.log(`Removed event listener for ${GEOWIDGET_CONFIG.EVENT_NAME}`);
    };
  }, [isModalOpen, handlePointSelected]);
  
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