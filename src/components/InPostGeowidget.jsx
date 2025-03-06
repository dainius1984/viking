import React, { useEffect, useState, useRef } from 'react';

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

const InPostGeowidget = ({ onPointSelected, selectedPoint: externalSelectedPoint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(externalSelectedPoint || null);
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  
  // Update internal state when external prop changes
  useEffect(() => {
    if (externalSelectedPoint) {
      setSelectedPoint(externalSelectedPoint);
    }
  }, [externalSelectedPoint]);
  
  // Load InPost Geowidget script
  useEffect(() => {
    // Add script only if it doesn't exist
    if (!document.getElementById('inpost-geowidget-script')) {
      const script = document.createElement('script');
      script.id = 'inpost-geowidget-script';
      script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Add CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://geowidget.inpost.pl/inpost-geowidget.css';
      document.head.appendChild(link);
    }
  }, []);
  
  // Initialize widget when modal opens
  useEffect(() => {
    if (!isModalOpen || !containerRef.current) return;
    
    // Function to handle point selection
    window.handleGeowidgetPointSelected = (point) => {
      if (!point) return;
      
      // Format address
      const addressString = typeof point.address === 'object' 
        ? `${point.address.line1 || ''} ${point.address.line2 || ''}`.trim()
        : (point.address || '');
      
      // Create formatted point data
      const formattedPoint = {
        name: point.name || '',
        address: addressString,
        point_id: point.name || '',
        city: point.city || '',
        post_code: point.post_code || '',
        selected_at: new Date().toISOString()
      };
      
      // Update state
      setSelectedPoint(formattedPoint);
      
      // Call callback
      if (onPointSelected && typeof onPointSelected === 'function') {
        onPointSelected(formattedPoint);
      }
      
      // Close modal
      setIsModalOpen(false);
    };
    
    // Clear container
    containerRef.current.innerHTML = '';
    
    // Wait for script to load
    const initWidget = () => {
      if (!window.easyPack) {
        setTimeout(initWidget, 100);
        return;
      }
      
      // Initialize widget
      window.easyPack.init({
        defaultLocale: 'pl',
        mapType: 'osm',
        searchType: 'osm',
        points: {
          types: ['parcel_locker']
        },
        map: {
          initialTypes: ['parcel_locker']
        }
      });
      
      // Create map instance
      widgetRef.current = window.easyPack.mapWidget('easypack-map', (point) => {
        window.handleGeowidgetPointSelected(point);
      });
    };
    
    // Create map container
    const mapDiv = document.createElement('div');
    mapDiv.id = 'easypack-map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '500px';
    containerRef.current.appendChild(mapDiv);
    
    // Initialize widget
    initWidget();
    
    // Cleanup
    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current = null;
        } catch (e) {
          console.error('Error cleaning up widget:', e);
        }
      }
    };
  }, [isModalOpen, onPointSelected]);
  
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
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
    </div>
  );
};

export default InPostGeowidget; 