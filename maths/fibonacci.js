// fibonaci using reduce method
let myArray = [1, 2, 3];
let arraySum = myArray.reduce((previous, current) =>  previous + current);
console.log(`Sum of array values is: ${arraySum}`); //output= Sum of array values is: 6
--------------------------------------------------------------------------------------------
// Sum All Odd Fibonacci Numbers
function sumFibs(num) {
  let prevNumber = 0;
  let currNumber = 1;
  let result = 0;
  while (currNumber <= num) {
    if (currNumber % 2 !== 0) {
      result += currNumber;
    }
    currNumber += prevNumber;
    prevNumber = currNumber - prevNumber;
  }

  return result;
}

// sumFibs(4);
console.log(sumFibs(4)); //5
----------------------------------------------------------------------------------------------
  /*
  One application of the Fibonacci sequence is in the field of technical analysis for stock price prediction. 
  Technical analysts often use Fibonacci retracement levels to identify potential support and resistance levels in stock prices.
  
  In the following example, the fibonacci function calculates the Fibonacci sequence up to a given number of terms. The calculateFibonacciRetracements 
  function then uses the Fibonacci sequence to calculate the common Fibonacci retracement levels (23.6%, 38.2%, 50%, 61.8%, and 76.4%) based 
  on the current and initial stock prices.

These Fibonacci retracement levels can be used by traders and analysts to identify potential support and resistance levels in the stock price. 
For instance, if the current stock price is approaching one of the Fibonacci retracement levels, it may indicate a potential support or resistance 
level, which could be used to make trading decisions.*/
 
// Function to calculate the Fibonacci sequence up to a given number of terms
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Function to calculate the Fibonacci retracement levels
function calculateFibonacciRetracements(currentPrice, initialPrice) {
  const priceChange = currentPrice - initialPrice;
  const retracements = [
    initialPrice + priceChange * 0.236, // 23.6% retracement
    initialPrice + priceChange * 0.382, // 38.2% retracement
    initialPrice + priceChange * 0.5, // 50% retracement
    initialPrice + priceChange * 0.618, // 61.8% retracement
    initialPrice + priceChange * 0.764 // 76.4% retracement
  ];

  return retracements;
}

// Example usage
const currentPrice = 100;
const initialPrice = 80;
const fibonacciRetracements = calculateFibonacciRetracements(currentPrice, initialPrice);

console.log('Fibonacci Retracement Levels:');
console.log('23.6%:', fibonacciRetracements[0]);
console.log('38.2%:', fibonacciRetracements[1]);
console.log('50%:', fibonacciRetracements[2]);
console.log('61.8%:', fibonacciRetracements[3]);
console.log('76.4%:', fibonacciRetracements[4]);
/*Fibonacci Retracement Levels:
23.6%: 84.72
38.2%: 87.64
50%: 90
61.8%: 92.36
76.4%: 95.28*/
