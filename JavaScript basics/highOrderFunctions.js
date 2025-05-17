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
/*
Explanation of the Function

    Filtering Positive Integers:
        The function first filters the input array arr using filter(). It checks each number to determine if it is a positive integer (greater than or equal to 0 and an integer).
        For the input [-3, 4.8, 5, 3, -3.2], the positive integers are [5, 3].

    Mapping to Squares:
        Next, it maps over the filtered array to square each positive integer using map(). The squaring operation is done using the exponentiation operator **.
        The result for [5, 3] will be [25, 9].

    Returning the Result:
        Finally, the function returns the new array of squared integers.
*/

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

/*
2. filter

The filter function creates a new array with all elements that pass the test implemented by the provided function.
Example Application: Filtering Data

Scenario: You have an array of products, and you want to get only those that are in stock.*/

const products = [
    { id: 1, name: 'Laptop', inStock: true },
    { id: 2, name: 'Phone', inStock: false },
    { id: 3, name: 'Tablet', inStock: true }
];

const inStockProducts = products.filter(product => product.inStock);
console.log(inStockProducts);
// Output: [{ id: 1, name: 'Laptop', inStock: true }, { id: 3, name: 'Tablet', inStock: true }]

/*
3. reduce

The reduce function executes a reducer function on each element of the array, resulting in a single output value.
Example Application: Summing Values

Scenario: You have an array of numbers, and you want to calculate the total sum.*/

const numbers = [1, 2, 3, 4, 5];

const totalSum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(totalSum); // Output: 15

/*
Combined Example: Chaining map, filter, and reduce

You can combine these functions to perform complex data transformations in a concise manner.

Scenario: Given an array of users, you want to find the total age of users who are over 30.*/

const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 35 },
    { id: 3, name: 'Charlie', age: 45 }
];

const totalAgeOver30 = users
    .filter(user => user.age > 30) // Step 1: Filter users over 30
    .map(user => user.age)         // Step 2: Extract their ages
    .reduce((sum, age) => sum + age, 0); // Step 3: Sum the ages

console.log(totalAgeOver30); // Output: 80
