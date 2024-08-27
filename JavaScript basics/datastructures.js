/* Datastructure is a programmatic way of storing data for efficient use */

// creating an aray with strings and integers and accessing arrays with myData
const myArray1 = ["Quincy", 1];
const myArray2 = [["Bulls", 23], ["White Sox", 45]]; // nested array
const myArray3 = [50, 60, 70];
const myData = myArray3[2];
console.log(myData); // 70
--------------------------------------------------------------------------------------

// Modify Array Data With Indexes
const myArray = [18, 64, 99];
myArray[0] = 45;

console.log(myArray); // [ 45, 64, 99 ]
---------------------------------------------------------------------------------------

// Access Multi-Dimensional Arrays With Indexes
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [[10, 11, 12], 13, 14]
];

const subarray = arr[3];
const nestedSubarray = arr[3][0];
const element = arr[3][0][1];
const myData = arr[2][1];

console.log("subarray:", subarray); // subarray: [ [ 10, 11, 12 ], 13, 14 ]
console.log("nestedSubarray:", nestedSubarray); // nestedSubarray: [ 10, 11, 12 ]
console.log("element:", element); // element: 11
console.log("myData:", myData); // myData: 8
------------------------------------------------------------------------------------------

// append data to the end of an array is via the push() function.
const arr1 = [1, 2, 3];
arr1.push(4); 
console.log(arr1); // [ 1, 2, 3, 4 ]

const arr2 = ["Stimpson", "J", "cat"];
arr2.push(["happy", "joy"]); 
console.log(arr2); // [ 'Stimpson', 'J', 'cat', [ 'happy', 'joy' ] ]
------------------------------------------------------------------------------------------

// .pop() removes the last element from an array and returns that element.
const myArray1 = [["John", 23], ["cat", 2]];

const removedFromMyArray1 = myArray1.pop();
console.log(myArray1); // [ [ 'John', 23 ] ]

// .shift() removes the first element
const myArray2 = [["John", 23], ["dog", 3]];

const removedFromMyArray2 = myArray2.shift();
console.log(myArray2); // [ [ 'dog', 3 ] ]

// .unshift() adds the element at the beginning of the array.
const myArray3 = [["John", 23], ["dog", 3]];

myArray3.unshift(["Paul", 35]);
console.log(myArray3); // [ [ 'Paul', 35 ], [ 'John', 23 ], [ 'dog', 3 ] ]

function popShift(arr) {
  let popped = arr.pop(); // remove the last element from arr
  let shifted = arr.shift(); // remove first element from arr
  return [shifted, popped];
}

console.log(popShift(["challenge", "is", "not", "complete"])); // [ 'challenge', 'complete' ]

function mixedNumbers(arr) {
  // add 'I', 2, 'three' to the beginning of the array
  arr.unshift("I", 2, "three");
  arr.push(7, "VIII", 9);
  //  adding 7, 'VIII', 9 to the end so that the returned array contains representations of the numbers 1-9 in order.
  return arr;
}

console.log(mixedNumbers(["IV", 5, "six"])); // ['I',     2,'three', 'IV',5,       'six',7,       'VIII',9]

/* splice methods */
const arr = [2, 4, 5, 1, 7, 5, 2, 1];

arr.splice(1, 4);// removes 4 elements from index 1 in arr

console.log(arr); // output [ 2, 5, 2, 1 ]
-----------------------------------------------------------------------------------------------------------------------
  // Accessing Object Properties with Dot Notation
const testObj = {
  "hat": "ballcap",
  "shirt": "jersey",
  "shoes": "cleats"
};

const hatValue = testObj.hat;      
const shirtValue = testObj.shirt; 
console.log(hatValue);
console.log(shirtValue);
------------------------------------------------------------------------------------------------------------------------
// Accessing Object Properties with Bracket Notation
const testObj = {
  "an entree": "hamburger",
  "my side": "veggies",
  "the drink": "water"
};

const entreeValue = testObj["an entree"];   
const drinkValue = testObj["the drink"];   
---------------------------------------------------------------------------------------------------
// reinitializing_variables_inside_loop.js
function zeroArray(m, n) {
  let newArray = [];
  for (let i = 0; i < m; i++) {
    let row = []; /* row has been declared inside the outer loop. 
     Now a new row will be initialised during each iteration of the outer loop allowing for the desired matrix. */
    for (let j = 0; j < n; j++) {
      row.push(3);
    }
    newArray.push(row);
  }
  return newArray;
}
let matrix = zeroArray(3, 3);
console.log(matrix); // output [ [ 3, 3, 3 ], [ 3, 3, 3 ], [ 3, 3, 3 ] ]
---------------------------------------------------------------------------------------------------------------------------

function htmlColorNames(arr) {
/* remove the first two elements of the array and add 'DarkSalmon' and 'BlanchedAlmond' in their respective places.*/
  arr.splice(0, 2, "DarkSalmon", "BlanchedAlmond");
  
  return arr;
}

console.log(
  htmlColorNames([
    "DarkGoldenRod","WhiteSmoke","LavenderBlush","PaleTurqoise","FireBrick"
  ])
);
------------------------------------------------------------------------------------------------------------------------------

/*Write a function that splits an array (first argument) into groups the length of size (second argument) 
and returns them as a two-dimensional array.*/
function chunkArrayInGroups(arr, size) {
  const newArr = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, size));
  }
  return newArr;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2)); // [ [ 'a', 'b' ], [ 'c', 'd' ] ]
-------------------------------------------------------------------------------------------------------------------------------

// Check For The Presence of an Element With indexOf()
function quickCheck(arr, elem) {
  return arr.indexOf(elem) != -1;
}
console.log(quickCheck(["squash", "onions", "shallots"], "mushrooms")); //false
--------------------------------------------------------------------------------
// Iterate Through All an Array's Items Using For Loops
function filteredArray(arr, elem) {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(elem) !== -1) {
      // Checks every parameter for the element and if it's there continues the code
      newArr.push(arr[i]); // Inserts the element of the array in the new filtered array
    }
  }

  return newArr;
}

// Change code here to test different cases:
console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));
-------------------------------------------------------------------------------------------------------------------------------

let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};
// Access Property Names with Bracket Notation
function checkInventory(scannedItem) {
  
  return foods[scannedItem];
}

// change code below this line to test different cases:
console.log(checkInventory("apples")); // 25
----------------------------------------------------------------------------------------------------------------------------------

// Use the delete keyword to remove keys from the foods object.
let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};


delete foods.oranges;
delete foods.plums;
delete foods.strawberries;

console.log(foods); // { apples: 25, bananas: 13, grapes: 35 }
------------------------------------------------------------------------------------------------------------------------------------

// Check if an Object has a Property
let users = {
  Alan: {
    age: 27,
    online: true
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: true
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function isEveryoneHere(userObj) {
  let names = Object.keys(userObj);
  return ["Alan", "Jeff", "Sarah", "Ryan"].every(name =>
    names.includes(name)
  );
}

console.log(isEveryoneHere(users)); // true
---------------------------------------------------------------------------------------------------------------------------------------

// Iterate Through the Keys of an Object with a for...in Statement
const users = {
  Alan: {
    online: false
  },
  Jeff: {
    online: true
  },
  Sarah: {
    online: false
  }
}

function countOnline(usersObj) {
  
    let result = 0;
  for (let user in usersObj) {
    if (usersObj[user].online === true) {
      result++;
    }
  }
  return result;
  
}

console.log(countOnline(users)); // 1
---------------------------------------------------------------------------------------------------------------------------------------

// Generate an Array of All Object Keys with Object.keys()
let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function getArrayOfUsers(obj) {
 
  return Object.keys(obj);
  
}

console.log(getArrayOfUsers(users)); // [ 'Alan', 'Jeff', 'Sarah', 'Ryan' ]
---------------------------------------------------------------------------------------------------------------------------------------

// Modify an Array Stored in an Object
let user = {
  name: "Kenneth",
  age: 28,
  data: {
    username: "kennethCodesAllDay",
    joinDate: "March 26, 2016",
    organization: "freeCodeCamp",
    friends: ["Sam", "Kira", "Tomo"],
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    }
  }
};

function addFriend(userObj, friend) {
  
  userObj.data.friends.push(friend);
  return userObj.data.friends;
 
}

console.log(addFriend(user, "Pete")); // [ 'Sam', 'Kira', 'Tomo', 'Pete' ]
--------------------------------------------------------------------------------------------------------------------------------

/*You are given two arrays and an index.
Copy each element of the first array into the second array, in order.
Begin inserting elements at index n of the second array.
Return the resulting array. The input arrays should remain the same after the function runs.*/
function frankenSplice(arr1, arr2, n) {
  return [...arr2.slice(0, n), ...arr1, ...arr2.slice(n)];
}

let arr1 = [5, 6, 7];
let arr2 = [1, 2, 3, 4];
let n = 2;

console.log(frankenSplice(arr1, arr2, n)); /* [
  1, 2, 5, 6,
  7, 3, 4
] */
---------------------------------------------------------------------------------------------------------------------------------

// finding an element using recursive method
function findElement(arr, func) {
  return arr.find(func);
}

console.log(findElement([1, 2, 3, 4], num => num % 2 === 0)); // 2
----------------------------------------------------------------------------------------------------------------------------------

/* Remove all falsy values from an array. Return a new array; do not mutate the original array.
Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.*/ 
function bouncer(arr) {
  return arr.filter(Boolean);
}

console.log(bouncer([7, "ate", "", false, 9])); // [ 7, 'ate', 9 ]
