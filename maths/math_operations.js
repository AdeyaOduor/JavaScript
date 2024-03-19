function sum(a, b){
    return a + b
  }
  function multiply(a, b){
    return a * b
  }
  function division(a, b){
    return a / b
  }
  function modulus(a, b){
    return a % b
  }
  function subtraction(a, b){
    return a - b
  }
// Call the functions with sample inputs and log the results to the console
console.log(sum(5, 3)); // Output: 8
console.log(multiply(4, 6)); // Output: 24
console.log(division(10, 2)); // Output: 5
console.log(modulus(7, 3)); // Output: 1 as the remainder of division
console.log(subtraction(9, 4)); // Output: 5

// OR
function multiply(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function subtraction(a, b) {
  return a - b;
}

// Call the functions with sample inputs and store the results
const results = [
  sum(2, 3),
  multiply(2, 3),
  division(2, 3),
  modulus(2, 3),
  subtraction(2, 3)
];

// Log the results to the console
console.log(results); // Output [ 5, 6, 0.6666666666666666, 2, -1 ]
--------------------------------------------------------------------------------------------------------------------------

// convert celcius to farenheight and vice versa
function convertCtoF(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

console.log(convertCtoF(30)); // Change the inputs below to test your code, Output is 86

// OR

function fahrenheitToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
}

// Example usage
const fahrenheit = 88;
const celsius = fahrenheitToCelsius(fahrenheit);
console.log(`${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(2)} degrees Celsius.`); // Output is 31.11
-----------------------------------------------------------------------------------------------------------------------------

// Sum All Numbers in a Range
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

sumAll([1, 4]);
