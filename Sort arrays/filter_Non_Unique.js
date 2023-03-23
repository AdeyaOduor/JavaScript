//program to filter out the non-unique values in an array.

const filter_Non_Unique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

console.log(filter_Non_Unique([1, 2, 2, 3, 4, 4, 5]));  
console.log(filter_Non_Unique([1, 2, 3, 4]));  

/* Use new Set() and the spread operator (...) to create an array of the unique values in arr.
Use Array.prototype.filter() to create an array containing only the unique values.

[1,3,5]
[1,2,3,4] */
