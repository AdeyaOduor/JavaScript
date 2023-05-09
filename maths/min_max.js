//program to return the minimum-maximum value of an array, after applying the provided function to set comparing rule. 

const reduce_Which = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
console.log(reduce_Which([1, 3, 2])); 
console.log(reduce_Which([10, 30, 20], (a, b) => b - a));  
console.log(reduce_Which(
  [{ name: 'Kevin', age: 16 }, { name: 'John', age: 20 }, { name: 'Ani', age: 19 }],
  (a, b) => a.age - b.age)); 
/* Use Array.prototype.reduce() in combination with the comparator function to get the appropriate element in the array.
Omit the second argument, comparator, to use the default one that returns the minimum element in the array. */
