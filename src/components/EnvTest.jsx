import React, { useEffect } from 'react';

const EnvTest = () => {
  useEffect(() => {
    console.log('Environment Test Component:', {
      test: process.env.REACT_APP_TEST,
      testIsDefined: typeof process.env.REACT_APP_TEST !== 'undefined',
      inpost: process.env.REACT_APP_INPOST_GEO_TOKEN,
      inpostIsDefined: typeof process.env.REACT_APP_INPOST_GEO_TOKEN !== 'undefined',
      nodeEnv: process.env.NODE_ENV // This should always be defined
    });
  }, []);

  return (
    <div>
      <h2>Environment Variables Test</h2>
      <p>Check the console for environment variable values</p>
      <p>NODE_ENV: {process.env.NODE_ENV}</p>
      <p>REACT_APP_TEST: {process.env.REACT_APP_TEST || 'Not defined'}</p>
      <p>REACT_APP_INPOST_GEO_TOKEN defined: {process.env.REACT_APP_INPOST_GEO_TOKEN ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default EnvTest; 