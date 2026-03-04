/* ES6, released in 2015, added many powerful new features to the language including arrow functions, 
destructuring, classes, promises, spread operators, and modules.

 Destructuring allows unpacking values from arrays (or properties from objects) into distinct variables.
Here, the first two values are ignored (using commas), and the rest of the array is captured into shorterList.
*/ 
function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sourceWithoutFirstTwo = removeFirstTwo(source) // Output [3, 4, 5, 6, 7, 8, 9, 10].

/* 
    This code swaps the values of a and b using array destructuring.
    Real-world application: Swapping values is common in algorithms, such as sorting or rearranging data.
*/ 
let a = 8, b = 6;

 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8

/* 
    The half function uses destructuring to directly get max and min from an object.
    Real-world application: This is useful when you have a config object and only need a few specific properties.
*/
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ({max, min}) => ((max + min) / 2.0);
console.log(half(stats)); // Output: 28.015

/*
    This code generates an HTML list from an array, using template literals.
    Real-world application: You often need to dynamically create lists of items in a web app based on API responses, and template literals can help keep the code clean and readable.

*/
const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"]
};

function makeList(arr) {
  return arr.map(val => `<li class="text-warning">${val}</li>`);
}

const failuresList = makeList(result.failure);

/* 
    This sets up a promise to simulate a server request. It resolves or rejects based on a condition.
    Real-world application: Promises are foundational for handling asynchronous operations like API calls, ensuring that your app can respond to data when it arrives.

*/
const makeServerRequest = new Promise((resolve, reject) => {
  let responseFromServer = true;
	
  if(responseFromServer) {
    resolve("We got the data");
  } else {
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});

// Example in data transformation from a csv file to uppercase
const fs = require('fs');
const csv = require('csv-parser');

// Read and transform data from CSV
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Perform transformations on each row of data
    const transformedData = transformData(row);

    // Output the transformed data
    console.log(transformedData);
  })
  .on('end', () => {
    console.log('Data transformation complete');
  });

// Function to perform data transformation
function transformData(row) {
  // Perform desired transformations on the row
  // Example: Convert row values to uppercase
  const transformedRow = {};
  for (const key in row) {
    if (row.hasOwnProperty(key)) {
      transformedRow[key] = row[key].toUpperCase();
    }
  }
  return transformedRow;
}
// ----------------------------------------------------------------------------------------------------------------------------------
/*Use object property shorthand with object literals to create and return an object 
with name, age and gender properties. */
const createPerson = (name, age, gender) => {
  return {name,age,gender};
};

console.log(createPerson("Zodiac Hasbro", 56, "male")); // returns a proper object
// ----------------------------------------------------------------------------------------------------------------------------------

// Imports and exports

// main.js
import { subtract } from './math_functions.js';

console.log(subtract(7, 4));

// Export math_functions.js
function subtract(a, b) {
  return a - b;
}

console.log(subtract(7, 4));
// ---------------------------------------------------------------------------------------------------------------------------
/* import statement allowing the current file to use the uppercaseString and lowercaseString functions you exported.
These functions are in a file called string_functions.js, which is in the same directory as the current file.*/
import { uppercaseString, lowercaseString } from './string_functions.js';

console.log(uppercaseString("hello"));
console.log(lowercaseString("WORLD!"));

// string_functions.js file on import
export function uppercaseString(string) {
  return string.toUpperCase();
}

export function lowercaseString(string) {
  return string.toLowerCase();
}
// inside the html file
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript in HTML</title>
</head>
<body>
  <h1 id="output">Hello, World!</h1>

  <script type="module" src="string_functions.js"></script>

</body>
</html>

/*

    This class utilizes getters and setters to abstract temperature conversion.
    Real-world application: Useful for creating cleaner APIs where users can interact with data without knowing internal conversion logic.

*/ 
class Thermostat {
  constructor(fahrenheit) {
    this._tempInCelsius = this.convertFahrenheitToCelsius(fahrenheit);
  }
  
  convertFahrenheitToCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
  }

  get temperature() {
    return this._tempInCelsius;
  }

  set temperature(newTemp) {
    this._tempInCelsius = newTemp;
  }
}

// Prompt the user to enter a temperature in Fahrenheit
const fahrenheitInput = prompt("Enter the temperature in Fahrenheit:");

// Convert the user input to a number
const fahrenheit = parseFloat(fahrenheitInput);

// Validate user input
if (isNaN(fahrenheit)) {
  console.log("Invalid input. Please enter a valid number.");
} else {
  // Create a new instance of the Thermostat class
  const thermos = new Thermostat(fahrenheit);

  // Retrieve the temperature in Celsius
  const celsius = thermos.temperature;

  // Display the converted temperature to the user
  console.log(`Temperature in Celsius: ${celsius.toFixed(2)}`);
}

/* Use the class keyword to create a Thermostat class. The constructor accepts a Fahrenheit temperature.

In the class, create a getter to obtain the temperature in Celsius and a setter to set the temperature in Celsius.

Remember that C = 5/9 * (F - 32) and F = C * 9.0 / 5 + 32, where F is the value of temperature in Fahrenheit, 
and C is the value of the same temperature in Celsius.

Note: When you implement this, you will track the temperature inside the class in one scale, either Fahrenheit or Celsius.

This is the power of a getter and a setter. You are creating an API for another user, who can get the correct result regardless 
of which one you track.

In other words, you are abstracting implementation details from the user. */
// -------------------------------------------------------------------------------------------------------------------------------------------------------

/* 
    The spread operator (...) is used to create a shallow copy of each array object.
    Real-world application: Useful for scenarios where you need to maintain immutability 
	(like in state management) or cloning data for handling in functions.
*/ 
function copyMachine(arr, num) {
  let newArr = [];
  while (num >= 1) {
    newArr.push([...arr]); // Using spread
    num--;
  }
  return newArr;
}

const studentData = [
  { name: 'John', age: 18 },
  { name: 'Emily', age: 19 },
  { name: 'Michael', age: 20 }
];

const testData = copyMachine(studentData, 1000);
// --------------------------------------------------------------------------------------------------------------------

function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ["learning", ...fragment, "is", "fun"]; // Combining arrays with spread operator
  return sentence;
}

console.log(spreadOut());
