/* Write a function that when given a number >= 0, returns an Array of ascending length subarrays.

pyramid(0) => [ ]
pyramid(1) => [ [1] ]
pyramid(2) => [ [1], [1, 1] ]
pyramid(3) => [ [1], [1, 1], [1, 1, 1] ] */


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
