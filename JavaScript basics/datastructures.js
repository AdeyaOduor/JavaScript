/* Datastructure is a programmatic way of storing data for efficient use */

// creating ana aray with a string and an integer
const myArray = ["Quincy", 1];
const myArray = [["Bulls", 23], ["White Sox", 45]]; // nested array
const myArray = [50, 60, 70];
const myData = myArray[0]; // 50

// Modify Array Data With Indexes
const myArray = [18, 64, 99];

myArray[0] = 45; // [45, 64, 99]

// Access Multi-Dimensional Arrays With Indexes
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [[10, 11, 12], 13, 14]
];

const subarray = arr[3]; //output [[10, 11, 12], 13, 14]
const nestedSubarray = arr[3][0]; // output [10, 11, 12]
const element = arr[3][0][1]; //output 11
const myData = arr[2][1]; //8

// append data to the end of an array is via the push() function.
const arr1 = [1, 2, 3];
arr1.push(4); //output [1,2,3,4]

const arr2 = ["Stimpson", "J", "cat"];
arr2.push(["happy", "joy"]); // ["Stimpson", "J", "cat", ["happy", "joy"]].

// .pop() removes the last element from an array and returns that element.
const myArray = [["John", 23], ["cat", 2]];

const removedFromMyArray = myArray.pop();

// .shift() removes the first element
const myArray = [["John", 23], ["dog", 3]];

const removedFromMyArray = myArray.shift();

// .unshift() adds the element at the beginning of the array.
const myArray = [["John", 23], ["dog", 3]];
myArray.shift();

myArray.unshift(["Paul", 35]); // output [["Paul", 35]["John", 23], ["dog", 3]]
// reinitializing_variables_inside_loop.js
function zeroArray(m, n) {
  let newArray = [];
  for (let i = 0; i < m; i++) {
    let row = []; /* row has been declared inside the outer loop. 
     Now a new row will be initialised during each iteration of the outer loop allowing 
     for the desired matrix. */
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    newArray.push(row);
  }
  return newArray;
}
let matrix = zeroArray(3, 2);
console.log(matrix); // output [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ] 

// pop_shift methods
function popShift(arr) {
  let popped = arr.pop(); // remove the last element from arr
  let shifted = arr.shift(); // remove first element from arr
  return [shifted, popped];
}

console.log(popShift(["challenge", "is", "not", "complete"]));

/* splice methods */
const arr = [2, 4, 5, 1, 7, 5, 2, 1];
// removes 4 elements from index 1 in arr
arr.splice(1, 4);

console.log(arr); // output [ 2, 5, 2, 1 ]

function htmlColorNames(arr) {
  /* remove the first two elements of the array and add 'DarkSalmon' and 'BlanchedAlmond' in their respective places.*/
  arr.splice(0, 2, "DarkSalmon", "BlanchedAlmond");
  
  return arr;
}

console.log(
  htmlColorNames([
    "DarkGoldenRod",
    "WhiteSmoke",
    "LavenderBlush",
    "PaleTurqoise",
    "FireBrick"
  ])
);

// fibonaci using reduce method
let myArray = [1, 2, 3];
let arraySum = myArray.reduce((previous, current) =>  previous + current);
console.log(`Sum of array values is: ${arraySum}`); //output= Sum of array values is: 6

/* push_unshift methods */
function mixedNumbers(arr) {
  // add 'I', 2, 'three' to the beginning of the array
  arr.unshift("I", 2, "three");
  arr.push(7, "VIII", 9);
  //  adding 7, 'VIII', 9 to the end so that the returned array contains representations of the numbers 1-9 in order.
  return arr;
}

console.log(mixedNumbers(["IV", 5, "six"]));