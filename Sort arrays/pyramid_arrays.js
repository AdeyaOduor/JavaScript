/*
pyramid function generates a two-dimensional array that represents a pyramid structure made of numbers. 
Each row of the pyramid contains increasing numbers of 1s.*/ 

function pyramid(n) {
  const res = []; // Initialize an empty array to hold the pyramid structure
  for(let i = 0; i < n; i++){ // Loop from 0 to n-1
    res.push([...Array(i+1)].fill(1)); // Create a new array filled with 1s and push it to res
  }
  return res; // Return the resulting pyramid structure
}
console.log(pyramid(4)); 
/*
[
  [1],
  [1, 1],
  [1, 1, 1],
  [1, 1, 1, 1]
]*/
// ---------------------------------------------------------------------------------------------------
  
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

const pyramidData = pyramid(5);
console.log(pyramidData);
/*
1. Data Visualization in Graphical User Interfaces

In applications that visualize data hierarchies or structures, 
such as organizational charts or hierarchical data displays, the pyramid can represent levels of data.
Output:
[
  [1],
  [1, 1],
  [1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1, 1]
]
*/

// -----------------------------------------------------------------------------------------------------------
/*
    The following function first checks if the input n is a non-negative integer. If not, it throws an error.
    It initializes an empty array result to store the subarrays.
    It then uses a for loop to iterate from 1 to n. For each iteration, it creates a new subarray of 
    length i and fills it with the value 1 using the Array(i).fill(1) syntax.
    The created subarray is then pushed into the result array.
    Finally, the function returns the result array.
*/
const pyramid = n => {
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(Array(i).fill(1));
  }
  return result;
};

// Example: Generate the first 5 rows of Pascal's triangle
const pascalTriangle = pyramid(5);
console.log(pascalTriangle);
// Output:
// [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
