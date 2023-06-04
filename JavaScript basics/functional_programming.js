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

// strict equality
function testStrict(val) {
  if (val === 7) { 
    return "Equal";
  }
  return "Not Equal";
}

testStrict(10);

function testNotEqual(val) {
  if (val!= 99) { 
    return "Not Equal";
  }
  return "Equal";
}

testNotEqual(10);

function testStrictNotEqual(val) {
  if (val!== 17) { 
    return "Not Equal";
  }
  return "Equal";
}

testStrictNotEqual(10);

// Functions that returns strings representing respective cup of tea
const prepareGreenTea = () => 'greenTea';
const prepareBlackTea = () => 'blackTea';
/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
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

/* Fill in the code for the function incrementer so it returns the value of the global variable fixedValue increased by one.*/
// the global variable
var fixedValue = 4;

// Add your code below this line
function incrementer(value) {
  return value + 1;

  // Add your code above this line
}

var differentValue = incrementer(fixedValue); // Should equal 5
console.log(fixedValue); // Should print 4
