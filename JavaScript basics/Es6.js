// destructuring-via-rest-elements.

function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sourceWithoutFirstTwo = removeFirstTwo(source)

// use-destructuring-assignment-to-assign-variables-from-arrays.txt

let a = 8, b = 6;

 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8

// use-destructuring-assignment-to-assign-variables-from-arrays.

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
    
// create-strings-using-template-literals.
/*Use template literal syntax with backticks to create an array of list element (li) strings. Each list element's text should be one of the array elements from the failure property on the result object and 
have a class attribute with the value text-warning. The makeList function should return the array of list item strings. 
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

export const uppercaseString = (string) => {
  return string.toUpperCase();
}

export const lowercaseString = (string) => {
  return string.toLowerCase()
}

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

<!-- A script that uses this module type can now use the import and export features -->
<html>
  <body>
    
<script type="module" src="index.js"></script>
  </body>
</html>


