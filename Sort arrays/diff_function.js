// implement a difference function which subtracts one list from another and returns the result
function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}

console.log(array_diff([1, 2], [1]));  // Output: [2]
console.log(array_diff([3, 4], [3]));  // Output: [4]
-----------------------------------------------------------------------------------------------------------------------------------
/*Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, 
return the symmetric difference of the two arrays.*/
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];

  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
const array1 = [1, 2, 3, 5];
const array2 = [1, 2, 3, 4, 6];
console.log(diffArray(array1, array2));
// Output: [4, 5, 6] in data comparison and synchronization
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(diffArray(array1, array2));
// Output: [1, 2, 6, 7] in filtering and transformation

console.log(array1.filter(item => array2.includes(item)));
// Output: [3, 4, 5] in filtering and transformation
--------------------------------------------------------------------------------------------------------------------------------------
/*Remove all elements from the initial array that are of the same value as these arguments. 
    Using spread operator to retrieve the arguments.
    Return the filtered array, using includes().
*/
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
---------------------------------------------------------------------------------------------------------------------------------------
/*an algorithm that will take an array for the first argument and return an array with all the 
objects that matches all the properties and values in the Object passed as second parameter.*/
function whatIsInAName(collection, source) {
  const sourceKeys = Object.keys(source);

  return collection
    .filter(obj => sourceKeys
      .every(key => obj.hasOwnProperty(key) &&
        obj[key] === source[key]));
}
