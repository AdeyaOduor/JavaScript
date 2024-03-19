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
console.log(results); // Output 
--------------------------------------------------------------------------------------------------------------------------

// convert celcius to farenheight
function convertCtoF(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

convertCtoF(30); // Change the inputs below to test your code

// Sum All Numbers in a Range
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

sumAll([1, 4]);
