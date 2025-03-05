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

  useEffect(() => {
    // Load the script only when modal is opened
    if (isModalOpen) {
      const script = document.createElement('script');
      script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
      script.async = true;
      
      script.onload = () => {
        if (containerRef.current) {
          // Clear previous content
          containerRef.current.innerHTML = '';
          
          // Create widget element
          const widget = document.createElement('inpost-geowidget');
          
          // Set required attributes
          widget.setAttribute('token', process.env.NEXT_PUBLIC_INPOST_GEO_TOKEN);
          widget.setAttribute('language', 'pl');
          widget.setAttribute('onpoint', 'handlePointSelected');
          
          // Set configuration
          const widgetConfig = {
            searchType: "google",
            mapType: "google",
            type: ["parcel_locker"],
            payment: ["parcel_locker"],
            allowedServices: ["parcel_locker"],
            showPoints: true,
            showInputField: true,
            defaultParams: {
              relative_point: "52.229676,21.012229", // Default location (Warsaw)
              max_distance: "10000" // 10km radius
            }
          };
          
          widget.setAttribute('config', JSON.stringify(widgetConfig));
          
          // Add widget to container
          containerRef.current.appendChild(widget);
          
          // Define callback function in window scope
          window.handlePointSelected = (event) => {
            const point = event.detail;
            console.log('Selected point:', point);
            setSelectedPoint(point);
            if (onPointSelected) {
              onPointSelected(point);
            }
            setIsModalOpen(false);
          };
        }
      };

      document.body.appendChild(script);

      return () => {
        // Cleanup
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        delete window.handlePointSelected;
      };
    }
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