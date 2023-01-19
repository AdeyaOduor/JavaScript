// Define a function and calling it
function reusableFunction() {
  console.log("Hi World");
}

reusableFunction();

// Passing Values to Functions with Arguments
function functionWithArgs(one, two) {
  console.log(one + two);
}
functionWithArgs(7, 3); //This will console log 10.

/* a function timesFive that accepts one argument, multiplies it by 5, and returns the new value.*/
function timesFive(num) {
  return num * 5;
}

// global variables
let myGlobal = 10;

function fun1() {
  oopsGlobal = 5;
}

function fun2() {
  var output = "";
  if (typeof myGlobal != "undefined") {
    output += "myGlobal: " + myGlobal;
  }
  if (typeof oopsGlobal != "undefined") {
    output += " oopsGlobal: " + oopsGlobal;
  }
  console.log(output);
}
// local variables
function myLocalScope() {
  var myVar = 5;
  console.log(myVar);
}
myLocalScope();

console.log(myVar);

/* It is possible to have both local and global variables with the same name. When you do this, the local variable takes precedence over the global variable.*/
var outerWear = "T-Shirt";

function myOutfit() {
  var outerWear = "sweater";

  return outerWear;
}

console.log(myOutfit());
console.log(outerWear);

/*A function can include the return statement but it does not have to. In the case that the function doesn't have a return statement, when you call it, the function processes the inner code but the returned value is undefined.*/
var sum = 0;

function addThree() {
  sum = sum + 3;
}

function addFive() {
  sum = sum + 5;
}

addThree();
addFive(); // output is 8

let processed = 0;

function processArg(num) {
  return (num + 3) / 5;
}

// Call the processArg function with an argument of 7 and assign its return value to the variable processed.
processed = processArg(7); // Equal to 2

/*a function nextInLine which takes an array (arr) and a number (item) as arguments.
Add the number to the end of the array, then remove the first element of the array.
The nextInLine function should then return the element that was removed.*/
function nextInLine(arr, item) {
  // Your code here
  arr.push(item);
  return arr.shift(); 
}
 
var testArr = [1,2,3,4,5];
 
console.log("Before: " + JSON.stringify(testArr));
console.log(nextInLine(testArr, 6));
console.log("After: " + JSON.stringify(testArr));
