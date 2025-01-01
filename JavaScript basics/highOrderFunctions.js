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

// The squared positive integers could be used in scientific calculations, such as finding the variance or standard deviation of the measurements.
const measurements = [2.5, -1.2, 4, 0, 3.7, -5.1, 8];
const squaredPositiveIntegers = squareList(measurements); //[16, 9, 64]
// ----------------------------------------------------------------------------------------------------------------------------------------------------

/*
Higher-order functions like map, filter, and reduce are powerful tools in JavaScript that allow for functional programming styles. 
These functions operate on arrays and can be used to transform data, filter elements, and aggregate results. 
Here are some example applications for each:
1. map

The map function creates a new array populated with the results of calling a provided function on every element in the calling array.
Example Application: Transforming Data

Scenario: You have an array of objects representing users, and you want to extract just the names into a new array.*/

const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];

const names = users.map(user => user.name);
console.log(names); // Output: ['Alice', 'Bob', 'Charlie']
