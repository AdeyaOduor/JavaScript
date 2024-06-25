// Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

function pyramid(n) {
  const res = [];
  for(let i = 0; i < n; i++){
    res.push([...Array(i+1)].fill(1))
  }
  return res;
}
console.log(pyramid(0)); // []
console.log(pyramid(1)); // [[1]]
console.log(pyramid(2)); // [[1], [1, 1]]
console.log(pyramid(3)); // [[1], [1, 1], [1, 1, 1]]
-------------------------------------------------------------------------------------
  
function pyramid(n) {
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  const result = [];

  for (let i = 1; i <= n; i++) {
    result.push(Array(i).fill(1));
  }

  return result;
}
/*
    The function first checks if the input n is a non-negative integer. If not, it throws an error.
    It initializes an empty array result to store the subarrays.
    It then uses a for loop to iterate from 1 to n. For each iteration, it creates a new subarray of 
    length i and fills it with the value 1 using the Array(i).fill(1) syntax.
    The created subarray is then pushed into the result array.
    Finally, the function returns the result array.
*/
