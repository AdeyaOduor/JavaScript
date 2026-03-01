import React, { useEffect, useState } from "react";
import { getGifs } from "./giphy";


export default function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("programming");

  useEffect(() => {
    
    async function fetch() {
      const gifs = await getGifs(querry);
      setGifs(gifs);
    }

    fetch();
  }, [query]); 

  function changeQuery(event){
    setQuery(event.target.value);
  }
    return (
      <div>
        <h1>Exercise 7</h1>
        gifs.map((gif, index) => (
          <video key={index} autoPlay loop src={gif} />
        ))[];
      </div>
    );
  }
// =====================================================================================================================

import React, { useState } from 'react';
import styles from './YourStyles.module.css'; // Adjust the import based on your file structure

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
    <>
      <h1>Exercise 3</h1>
      <div>
        <button className={styles.btn} onClick={decrement} disabled={counter <= 0}>
          -
        </button>
        <span className={styles.counter}>{counter}</span>
        <button className={styles.btn} onClick={increment}>
          +
        </button>
      </div>
    </>
  );
}

export default Counter; // Don't forget to export your component
