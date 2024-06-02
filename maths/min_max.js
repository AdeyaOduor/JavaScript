//program to return the minimum-maximum value of an array, after applying the provided function to set comparing rule. 

const reduce_Which = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
console.log(reduce_Which([1, 3, 2])); 
console.log(reduce_Which([10, 30, 20], (a, b) => b - a));  
console.log(reduce_Which(
  [{ name: 'Kevin', age: 16 }, { name: 'John', age: 20 }, { name: 'Ani', age: 19 }],
  (a, b) => a.age - b.age)); 
/*1
30
{ name: 'Kevin', age: 16 }*/
------------------------------------------------------------------------------------------------------------------------
/* Use Array.prototype.reduce() in combination with the comparator function to get the appropriate element in the array.
Omit the second argument, comparator, to use the default one that returns the minimum element in the array. */

function findLongestWordLength(s) {
  return s
    .split(' ')
    .reduce((longest, word) => Math.max(longest, word.length), 0);
}

// largest 1
function largestOfFour(arr) {
  return arr.map(Function.apply.bind(Math.max, null));
}

// largest 2
function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}

/*Count the number of entries that are smaller than the new value num
The new value would be inserted after these values*/
function getIndexToIns(arr, num) {
  return arr.filter(val => num > val).length;
}

getIndexToIns([40, 60], 50);
