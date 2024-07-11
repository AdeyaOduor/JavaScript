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

console.log(sumAll([1, 4])); // Output is 10

/*
The sumAll function you provided has a real-world application in various scenarios where you need to calculate the sum of all integers 
between a given range of numbers. Here are some examples of how this function could be used:

    Calculating Sums in Financial and Accounting Applications:
        Calculating the total interest earned on a savings account over a given period, where the interest rate and the starting and ending 
        balances are known.
        Calculating the total sales for a product or service over a specific date range, where the daily or monthly sales figures are recorded.
        Calculating the total expenses for a project or department over a fiscal year, where the expenses are tracked on a monthly or quarterly basis.

    Analyzing Data in Scientific and Engineering Applications:
        Calculating the total energy consumption or production over a given time period in a renewable energy system, where the hourly or daily 
        power generation/consumption data is available.
        Calculating the total distance traveled by a vehicle or a person over a specific route, where the position data is recorded at regular 
        intervals.
        Calculating the total rainfall or snowfall over a season or a year, where the daily or weekly precipitation data is collected.

    Implementing Algorithms and Data Structures:
        Calculating the sum of a range of numbers in a number-theoretic algorithm, such as the Gaussian sum formula or the sum of an arithmetic 
        sequence.
        Implementing a feature in a data structure, such as a range query in a segment tree or a binary indexed tree, where the sum of a range of 
        elements needs to be computed efficiently.
        Solving mathematical problems that involve the sum of a range of integers, such as finding the sum of the first n natural numbers or the 
        sum of the squares of the first n integers.
*/

//Example 1
const dailySales = [
  100, 120, 150, 80, 90, 110, 130,
  140, 160, 170, 180, 190, 200, 210,
  220, 230, 240, 250, 260, 270, 280,
  290, 300, 310, 320, 330, 340, 350, 360, 370
];

function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

// Calculate total sales per week
const weeklySales = [];
for (let i = 0; i < dailySales.length; i += 7) {
  weeklySales.push(sumAll(dailySales.slice(i, i + 7)));
}

console.log("Weekly Sales:");
weeklySales.forEach((sale, index) => {
  console.log(`Week ${index + 1}: $${sale}`);
});

// Calculate total sales for the entire period
const totalSales = sumAll(dailySales);
console.log(`\nTotal Sales: $${totalSales}`);
