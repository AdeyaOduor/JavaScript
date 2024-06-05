import React, { useEffect, useState } from 'react';

const GPSLocationTracker = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trackGPSLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => {
            setError(error.message);
            setLatitude(null);
            setLongitude(null);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    trackGPSLocation();

    // Clean up the tracker when the component unmounts
    return () => {
      navigator.geolocation.clearWatch();
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {latitude && longitude ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default GPSLocationTracker;
-----------------------------------------------------------------------------------------------------------------
// inside App.js import above code:
import React from 'react';
import GPSLocationTracker from './GPSLocationTracker';

const App = () => {
  return (
    <div>
      <h1>GPS Location Tracker</h1>
      <GPSLocationTracker />
    </div>
  );
};

export default App;
