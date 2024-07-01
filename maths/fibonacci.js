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
  /*One application of the Fibonacci sequence is in the field of technical analysis for stock price prediction. 
  Technical analysts often use Fibonacci retracement levels to identify potential support and resistance levels in stock prices.*/
