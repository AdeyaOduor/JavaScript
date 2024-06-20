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
---------------------------------------------------------------------
//Image handling with GPS coordinates
import React, { useState, useEffect } from "react";
import exifr from "exifr";
import "./styles.css";

export default function App() {
  const [file, setFile] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const readFile = async () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setImgSrc(reader.result);
      setLoading(false);
    });

    reader.readAsDataURL(file);

    try {
      const { latitude, longitude } = await exifr.gps(file);
      console.log(latitude, longitude);
    } catch (e) {
      console.error("No GPS Meta Data\nTry another picture");
      throw new Error("No GPS Meta Data\nTry another picture");
    }
  };

  useEffect(() => {
    readFile();
  }, [file]);

  return (
    <div className="App">
      <h1>Load an Image</h1>
      <h2>Only React</h2>
      <input type="file" onChange={handleChange} />
      {!loading && <img id="output" src={imgSrc} alt="Preview" />}
    </div>
  );
}  
  
