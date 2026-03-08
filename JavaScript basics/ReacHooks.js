/*
npx create-react-app gif-search-app
cd gif-search-app
npm install axios
*/

// src/giphy.js
import axios from 'axios';

const API_KEY = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API key
const API_URL = 'https://api.giphy.com/v1/gifs/search';

export async function getGifs(query) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        q: query,
        limit: 10, // You can adjust the limit as needed
        offset: 0,
        rating: 'G',
        lang: 'en'
      }
    });

    if (response.status === 200) {
      // Successfully got the response
      return response.data.data.map(gif => gif.images.original.mp4); // Return the mp4 URLs
    } else {
      // Handle the case where the response status is not 200
      console.error('Error fetching GIFs:', response.statusText);
      throw new Error('Failed to fetch GIFs');
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('API request failed:', error);
    throw new Error('API request failed. Please try again later.');
  }
}

// App.js
import React, { useEffect, useState } from "react";
import { getGifs } from "./giphy";

export default function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("programming");

  useEffect(() => {
    async function fetchGifs() {
      const fetchedGifs = await getGifs(query);
      setGifs(fetchedGifs);
    }

    fetchGifs();
  }, [query]);

  function changeQuery(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <h1>GIF Search App</h1>
      <input 
        type="text" 
        placeholder="Search for GIFs..." 
        value={query} 
        onChange={changeQuery} 
      />
      <div>
        {gifs.map((gif, index) => (
          <video key={index} autoPlay loop src={gif} style={{ width: '300px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

/*
npm start

Key Features of the Application

    State Management: Uses useState to manage the current GIFs and the search query.
    Side Effects: Uses useEffect to fetch GIFs whenever the search query changes.
    User Input: The user can type in the search box to change the GIFs being displayed.
    GIF Display: Displays GIFs as videos that autoplay and loop.

Handling the Error in Your Application

You can handle the errors when calling getGifs in your main application. Here's an example of how you would call this function with error handling:
javascript

(async () => {
  try {
    const gifs = await getGifs('funny cats');
    console.log(gifs);
  } catch (error) {
    console.error(error.message); // Display user-friendly error message
  }
})();


*/
// =================================== Counter Hooks ============================================================

/* npx create-react-app counter-app
cd counter-app
*/

// Counter.js
import React, { useState } from 'react';
import styles from './App.css'; // Make sure to create and point to your CSS file

function Counter() {
  const [counter, setCounter] = useState(0); // Initialize counter state

  function increment() {
    setCounter(counter + 1);
  }

  function decrement() {
    // Prevent decrementing below 0
    if (counter > 0) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Counter App</h1>
      <div className={styles.counterContainer}>
        <button className={styles.btn} onClick={decrement} disabled={counter <= 0}>
          -
        </button>
        <span className={styles.counter}>{counter}</span>
        <button className={styles.btn} onClick={increment}>
          +
        </button>
      </div>
      <p className={styles.instructions}>
        Click the buttons to increment or decrement the counter. The counter cannot go below zero.
      </p>
    </div>
  );
}

export default Counter;

// App.js
import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;

// App.css
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }
  
  .title {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .counterContainer {
    display: flex;
    align-items: center;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 1.5em;
    margin: 0 10px;
    cursor: pointer;
    border: 2px solid #007bff;
    background-color: #fff;
    color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .btn:hover:not(:disabled) {
    background-color: #007bff;
    color: white;
  }
  
  .counter {
    font-size: 2em;
    margin: 0 20px;
  }
  
  .instructions {
    margin-top: 20px;
    color: #666;
    text-align: center;
  }

/*npm start
  npm run build
  npm test
  */

// =============================== Derived Hooks ======================================================================
// Derived.js
import React, { useState } from "react";
import './App.css';  // Importing CSS for styles

export default function App() {
  const [counter, setCounter] = useState(0);
  
  const isEven = counter % 2 === 0;

  return (
    <div className={`app ${isEven ? 'even' : 'odd'}`}>
      <h1>Counter App</h1>
      <div className="counter-container">
        <button className="btn" onClick={() => setCounter(counter - 1)}>
          -
        </button>
        <span className="counter">{counter}</span>
        <button className="btn" onClick={() => setCounter(counter + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

// App.js
import React from 'react';
import Counter from './Derived';

function App() {
  return (
    <div>
      <Derived />
    </div>
  );
}

export default App;


// App.css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transition: background-color 0.5s;
}

.even {
    background-color: blue; /* Background for even */
    color: white; /* Text color for better contrast */
}

.odd {
    background-color: yellow; /* Background for odd */
    color: black; /* Text color for better contrast */
}

.counter-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.btn {
    padding: 10px 15px;
    margin: 0 10px;
    font-size: 1.5em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0056b3; /* Darker shade on hover */
}

.counter {
    font-size: 2em;
    padding: 0 20px;
}
