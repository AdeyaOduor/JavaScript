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

/*
*/

// Counter.js
import React, { useState } from 'react';
import styles from './counter.css'; // Make sure to create and point to your CSS file

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

// counter.css
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
