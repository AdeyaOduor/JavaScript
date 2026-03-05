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
  return response.data.data.map(gif => gif.images.original.mp4); // Return the mp4 URLs
}
