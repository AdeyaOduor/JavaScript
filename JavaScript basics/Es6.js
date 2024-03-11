/* ES6, released in 2015, added many powerful new features to the language including arrow functions, 
destructuring, classes, promises, spread operators, and modules.*/
// destructuring-via-rest-elements.
function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sourceWithoutFirstTwo = removeFirstTwo(source) // Output [3, 4, 5, 6, 7, 8, 9, 10].

// use-destructuring-assignment-to-assign-variables-from-arrays.txt
let a = 8, b = 6;

 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8

// use-destructuring-assignment-to-pass-an-object-as-a-functions-parameters.txt
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ({max, min}) => ((max + min) / 2.0); // use function argument destructurung

console.log(stats); // should be object
console.log(half(stats)); // should be 28.015
------------------------------------------------------------------------------------------------------------------------------
    
// create-strings-using-template-literals.
/*Use template literal syntax with backticks to create an array of list element (li) strings. Each list element's text should be 
one of the array elements from the failure property on the result object and have a class attribute with the value text-warning. 
The makeList function should return the array of list item strings in non-module environment. 
*/
const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"],
  skipped: ["no-extra-semi", "no-dup-keys"]
};

function makeList(arr) {
  return arr.map(val => `<li class="text-warning">${val}</li>`);
}

const failuresList = makeList(result.failure);

const uppercaseString = (string) => {
  return string.toUpperCase();
}

const lowercaseString = (string) => {
  return string.toLowerCase();
}

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
----------------------------------------------------------------------------------------------------------------------------------
/*Use object property shorthand with object literals to create and return an object 
with name, age and gender properties. */
const createPerson = (name, age, gender) => {
  return {name,age,gender};
};

console.log(createPerson("Zodiac Hasbro", 56, "male")); // returns a proper object

/* import statement allowing the current file to use the uppercaseString and lowercaseString functions you exported.
These functions are in a file called string_functions.js, which is in the same directory as the current file.*/
import { uppercaseString, lowercaseString  } from './string_functions.js';  

uppercaseString("hello");
lowercaseString("WORLD!");

/* The code in this file requires the contents of the file: string_functions.js, that is in the same directory as the current file. 
Use the import * as syntax to import everything from the file into an object called stringFunctions */
import * as stringFunctions from "./string_functions.js";

stringFunctions.uppercaseString("hello");
stringFunctions.lowercaseString("WORLD!");

/* In the following code, import the default export from the math_functions.js file, 
found in the same directory as this file. Give the import the name subtract */
import subtract from "./math_functions.js";  

subtract(7,4);

// getters_setters
class Thermostat {
  constructor(fahrenheit) {
    this._tempInCelsius = 5/9 * (fahrenheit - 32);
  }
  get temperature(){
    return this._tempInCelsius;
  }
  set temperature(newTemp){
    this._tempInCelsius = newTemp;
  }
}

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius

/* Use the class keyword to create a Thermostat class. The constructor accepts a Fahrenheit temperature.

In the class, create a getter to obtain the temperature in Celsius and a setter to set the temperature in Celsius.

Remember that C = 5/9 * (F - 32) and F = C * 9.0 / 5 + 32, where F is the value of temperature in Fahrenheit, 
and C is the value of the same temperature in Celsius.

Note: When you implement this, you will track the temperature inside the class in one scale, either Fahrenheit or Celsius.

This is the power of a getter and a setter. You are creating an API for another user, who can get the correct result regardless of which one you track.

In other words, you are abstracting implementation details from the user. */


<!-- A script that uses this module type can now use the import and export features -->
<html>
  <body>
    
<script type="module" src="index.js"></script>
  </body>
</html>

/* Create a new promise called makeServerRequest. 
Pass in a function with resolve and reject parameters to the constructor, and Handle a Fulfilled Promise with then. */

const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to true to represent a successful response from a server
  let responseFromServer = true;
	
  if(responseFromServer) {
    resolve("We got the data");
  } else {	
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
});

// Handle a Rejected Promise with catch

const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to false to represent an unsuccessful response from a server
  let responseFromServer = false;
	
  if(responseFromServer) {
    resolve("We got the data");
  } else {	
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
});

makeServerRequest.catch(error => {
  console.log(error);
});


// Es6 spread operators

function copyMachine(arr, num) {
  let newArr = [];
  while (num >= 1) {
    // spread operator making a copy of passed argumnets
    newArr.push([...arr]);
    
    num--;
  }
  return newArr;
}

console.log(copyMachine([true, false, true], 2));


function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ["learning", ...fragment, "is", "fun"]; // Combining arrays with spread operator
  return sentence;
}

console.log(spreadOut());
