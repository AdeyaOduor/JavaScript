// Create person object
const Person = function(firstAndLast) {
  this._firstName = firstAndLast.split(' ')[0];
  this._lastName = firstAndLast.split(' ')[1];

  this.getFirstName = function() {
    return this._firstName;
  };

  this.getLastName = function() {
    return this._lastName;
  };

  this.getFullName = function() {
    return `${this._firstName} ${this._lastName}`;
  };

  this.setFirstName = function(first) {
    this._firstName = first;
    return this._firstName;
  };

  this.setLastName = function(last) {
    this._lastName = last;
    return this._lastName;
  };

  this.setFullName = function(firstAndLast) {
    this._firstName = firstAndLast.split(' ')[0];
    this._lastName = firstAndLast.split(' ')[1];
    return `${this._firstName} ${this._lastName}`;
  };
};

// Define a function and calling it
function reusableFunction() {
  console.log("Hi World");
}

reusableFunction(); // Hi World
// -------------------------------------------------------------
// Passing Values to Functions with Arguments
function functionWithArgs(one, two) {
  console.log(one + two);
}
functionWithArgs(7, 3); //This will console log 10.
// --------------------------------------------------------------
/* a function timesFive that accepts one argument, multiplies 
it by 5, and returns the new value.*/
function timesFive(num) {
  return num * 5;
}

console.log(timesFive(2)); // 10
// ----------------------------------------------------------------
/*A function can include the return statement but it does not have 
to. In the case that the function doesn't have a return statement, 
when you call it, the function processes the inner code but the 
returned value is undefined.*/
var sum = 0;

function addThree() {
  sum = sum + 3;
}

function addFive() {
  sum = sum + 5;
}

addThree(); // output is undefined
addFive(); // output is undefined
// ---------------------------------------------------------------------------------------------------
let processed = 0; // This line declares a variable named processed and initializes it to 0.

function processArg(num) {
  return (num + 3) / 5;
}

/*
    A function named processArg is defined, which takes one argument, num.
    Inside the function, it performs the following calculation:
        It adds 3 to the input num.
        Then, it divides the result by 5.
    The result of this calculation is returned to the caller.
    Call the processArg function with an argument of 7 and assign its return value to the variable processed.
*/ 
processed = processArg(7); // Equal to 2
// --------------------------------------------------------------------------------------------------------------
/*a function nextInLine which takes an array (arr) and a number (item) as arguments.
Add the number to the end of the array, then remove the first element of the array.
The nextInLine function should then return the element that was removed.*/
function nextInLine(arr, item) {
  
  arr.push(item);
  return arr.shift(); 
}
 
var testArr = [1,2,3,4,5];
 
console.log("Before: " + JSON.stringify(testArr)); // Before: [1,2,3,4,5]
console.log(nextInLine(testArr, 6)); //1
console.log("After: " + JSON.stringify(testArr)); // After: [2,3,4,5,6]
// -----------------------------------------------------------------------------------------------------------------
// strict equality
function testStrict(val) {
  if (val === 7) { 
    return "Equal";
  }
  return "Not Equal";
}

console.log(testStrict(10));
// ---------------------------------------
function testNotEqual(val) {
  if (val!= 99) { 
    return "Not Equal";
  }
  return "Equal";
}

console.log(testNotEqual(10));
// ---------------------------------------------
function testStrictNotEqual(val) {
  if (val!== 17) { 
    return "Not Equal";
  }
  return "Equal";
}

testStrictNotEqual(10);
// ------------------------------------------------------------------------------
/* Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).*/
const prepareGreenTea = () => 'greenTea';
const prepareBlackTea = () => 'blackTea';

const getTea = (prepareTea, numOfCups) => {
  const teaCups = [];

  for(let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea();
    teaCups.push(teaCup);
  }
  return teaCups;
};

const tea4GreenTeamFCC = getTea(prepareGreenTea, 27); // :)
const tea4BlackTeamFCC = getTea(prepareBlackTea, 13); // :)

console.log(
  tea4GreenTeamFCC,
  tea4BlackTeamFCC
);
// ----------------------------------------------------------------------
// tabs is an array of titles of each site open within the window
const Window = function(tabs) {
  this.tabs = tabs; // We keep a record of the array inside the object
};

// When you join two windows into one window
Window.prototype.join = function(otherWindow) {
  this.tabs = this.tabs.concat(otherWindow.tabs);
  return this;
};

// When you open a new tab at the end
Window.prototype.tabOpen = function(tab) {
  this.tabs.push('new tab'); // Let's open a new tab for now
  return this;
};

// When you close a tab
Window.prototype.tabClose = function(index) {

  const tabsBeforeIndex = this.tabs.splice(0, index); // Get the tabs before the tab
  const tabsAfterIndex = this.tabs.splice(1); // Get the tabs after the tab
  this.tabs = tabsBeforeIndex.concat(tabsAfterIndex); // Join them together

  return this;
 };

// Let's create three browser windows
const workWindow = new Window(['GMail', 'Inbox', 'Work mail', 'Docs', 'freeCodeCamp']); // Your mailbox, drive, and other work sites
const socialWindow = new Window(['FB', 'Gitter', 'Reddit', 'Twitter', 'Medium']); // Social sites
const videoWindow = new Window(['Netflix', 'YouTube', 'Vimeo', 'Vine']); // Entertainment sites

// Now perform the tab opening, closing, and other operations
const finalTabs = socialWindow
  .tabOpen() // Open a new tab for cat memes
  .join(videoWindow.tabClose(2)) // Close third tab in video window, and join
  .join(workWindow.tabClose(1).tabOpen());
console.log(finalTabs.tabs);
// ------------------------------------------------------------------------------------------------------------------------------
/* Fill in the code for the function incrementer so it returns the value of the global variable fixedValue increased by one.*/
var fixedValue = 4;

function incrementer(value) {
  return value + 1;

}

var differentValue = incrementer(fixedValue); 
console.log(differentValue); // Should print 5
// -------------------------------------------------------------------------------------------------------------------------------------------
// Refactor global variables out of functions
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica",
                "Disquisitiones Arithmeticae"];

/* This function should add a book to the list and return the list, New parameters should come before bookName */
function add(list, bookName) {
  return [...list, bookName];
}

/* This function should remove a book from the list and return the list, New parameters should come before the bookName one */
function remove(list, bookName) {
  return list.filter(book => book !== bookName);
}

var newBookList = add(bookList, 'A Brief History of Time');
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');

console.log(bookList);
// -------------------------------------------------------------------------------------------------------------------------------------------
// Remove Elements from an Array Using slice Instead of splice, limiting the provided cities array to a length of 3, 
// and return a new array with only the first three items.
function nonMutatingSplice(cities) {
  return cities.slice(0, 3);
}

const inputCities = ["Chicago", "Delhi", "Islamabad", "London", "Berlin"];
const slicedCities = nonMutatingSplice(inputCities);

console.log(slicedCities); // [ 'Chicago', 'Delhi', 'Islamabad' ]
// ----------------------------------------------------------------------------------------------------
// Combine Two Arrays Using the concat Method
function nonMutatingConcat(original, attach) {
  return original.concat(attach);
}

const first = [1, 2, 3];
const second = [4, 5];
const concatenatedArray = nonMutatingConcat(first, second);

console.log(concatenatedArray); // [ 1, 2, 3, 4, 5 ]
// ------------------------------------------------------------------------------------------------

// Add Elements to the End of an Array Using concat Instead of push
function nonMutatingPush(original, newItem) {
  
  let concatArray = original.concat(newItem);
   console.log(concatArray);
   return concatArray
}

const first = [1, 2, 3];
const second = [4, 5];
nonMutatingPush(first, second); // [ 1, 2, 3, 4, 5 ]

// -----------------------------------------------------------------------------------------------------

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

// Example distances logged by the user
const distances = [-5, 10, 3, 2.5, 7, -1, 4];

// Function to calculate squared distances of valid runs
const squaredDistances = squareList(distances);
console.log(squaredDistances);  // Outputs: [100, 9, 49, 16]

const investmentReturns = [-5, 10, 3.5, 15, -2, 4, 20, 7.2];
const squaredReturns = squareList(investmentReturns);
console.log(squaredReturns);  // Outputs: [100, 225, 16, 400]
/*
The financial analyst can use the squared returns to:
    Identify High Performers: The squared values emphasize high returns, making it easier to identify which investments performed exceptionally well.
    Risk Assessment: By focusing on the squared values, the analyst can assess the potential impact of positive returns on overall portfolio performance.
    Reporting: The squared returns can be included in performance reports to highlight the effectiveness of investments, particularly in presentations to stakeholders.
*/
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

