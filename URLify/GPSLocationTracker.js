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
