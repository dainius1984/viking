import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (isModalOpen) {
      // Load InPost Geowidget script
      const script = document.createElement('script');
      script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
      script.async = true;
      document.body.appendChild(script);

      // Define the global callback function
      window.pointSelected = (event) => {
        const point = event.detail;
        console.log('Selected point:', point);
        setSelectedPoint(point);
        if (onPointSelected) {
          onPointSelected(point);
        }
        setIsModalOpen(false);
      };

      return () => {
        document.body.removeChild(script);
        delete window.pointSelected;
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
          <>
            <span>Zmień paczkomat: {selectedPoint.name}</span>
          </>
        ) : (
          <>
            <span>Wybierz paczkomat</span>
          </>
        )}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="h-[600px] w-full">
          <h2 className="text-lg font-medium mb-4">Wybierz paczkomat</h2>
          <inpost-geowidget 
            token={process.env.NEXT_PUBLIC_INPOST_GEO_TOKEN}
            language="pl"
            onpoint="pointSelected"
            config='{
              "searchType": "google",
              "mapType": "google",
              "fields": ["name", "address", "location"]
            }'
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