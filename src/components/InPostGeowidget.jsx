import React, { useEffect } from 'react';

const InPostGeowidget = ({ onPointSelected }) => {
  useEffect(() => {
    // Load InPost Geowidget script
    const script = document.createElement('script');
    script.src = 'https://geowidget.inpost.pl/inpost-geowidget.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle point selection
  const handlePointSelected = (event) => {
    const point = event.detail;
    console.log('Selected point:', point);
    if (onPointSelected) {
      onPointSelected(point);
    }
  };

  return (
    <div className="w-full">
      <inpost-geowidget 
        token={process.env.NEXT_PUBLIC_INPOST_GEO_TOKEN}
        language="pl"
        onpoint="pointSelected"
      />
      <input 
        type="hidden" 
        id="paczkomat-input" 
        name="paczkomat"
      />
    </div>
  );
};

export default InPostGeowidget; 