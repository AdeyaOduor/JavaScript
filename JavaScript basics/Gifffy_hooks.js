/*
npx create-react-app gif-search-app
cd gif-search-app
npm install axios
*/

// src/giphy.js
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

// App/js
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
