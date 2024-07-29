// Higher-Order Functions map, filter, or reduce to Solve a Complex Problem
/* A function named squareList that takes an array (arr) as input. The function's purpose is to filter the input array for positive integers, 
square each of the filtered integers, and return the resulting array of squared integers.*/
const squareList = arr => {
  const positiveIntegers = arr.filter(num => {
    return num >= 0 && Number.isInteger(num);
  });
  
  const squaredIntegers = positiveIntegers.map(num => {
    return num ** 2;
  });
  return squaredIntegers;
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers); // [ 25, 9 ]

/* The `squareList` function could be used to validate and clean user input, ensuring that only positive 
integer values are accepted and processed further.*/
const userInput = [-2.3, 4, 0, 6.7, -1, 3.14];
const squaredPositiveIntegers = squareList(userInput); //[16, 9, 81]

