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
