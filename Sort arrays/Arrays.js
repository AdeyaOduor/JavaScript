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

const treeLevels = pyramid(5);
console.log(treeLevels);
/* Output:
[
  [1],
  [1, 1],
  [1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1, 1]
]
This function can be useful for visualizing hierarchical data structures, such as in educational contexts 
where you want to illustrate concepts like binary trees, organizational charts, or any form of structured data.*/
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

// ======================================================================================================================

// steamrollArray function is designed to recursively flatten a multi-dimensional array into a single-dimensional array.
function steamrollArray(arr) {
  let flattened = [];

  arr.map(val => {
    if (!Array.isArray(val)) {
      flattened.push(val);
    }
    else {
      flattened.push(...steamrollArray(val));
    }
  })

  return flattened;
}

const nestedData = [1, [2, [3, 4], 5], [6, [7, 8]]];
const flatData = steamrollArray(nestedData);
console.log(flatData); 

const sensorData = [
  {
    id: 1,
    readings: [
      { timestamp: '2023-07-29', value: 10 },
      { timestamp: '2023-07-30', value: 12 }
    ]
  },
  {
    id: 2,
    readings: [
      { timestamp: '2023-07-29', value: 8 },
      { timestamp: '2023-07-30', value: 9 },
      { timestamp: '2023-07-31', value: 11 }
    ]
  }
];

const flatSensorData = steamrollArray(sensorData);
console.log(flatSensorData); 

const userPreferences = [
    "notifications",
    ["email", ["sms", "push"]],
    "language",
    ["English", ["Spanish", "French"]]
];

const flattenedPreferences = steamrollArray(userPreferences);
console.log(flattenedPreferences); 

const flattenedPreferences = steamrollArray(userPreferences);
console.log(flattenedPreferences); 
// Output: ["notifications", "email", "sms", "push", "language", "English", "Spanish", "French"]

/* Write function smaller(arr) that given an array arr, you have to return the amount of numbers that are smaller than arr[i] to the right. 
For example: smaller([5, 4, 3, 2, 1]) === [4, 3, 2, 1, 0] smaller([1, 2, 0]) === [1, 1, 0]
*/
function smaller(arr) {
  let res = new Array(arr.length), i, d, n, counts = [new Uint16Array(new ArrayBuffer(4096)),
    new Uint16Array(new ArrayBuffer(2048)), new Uint16Array(new ArrayBuffer(1024)),
    new Uint16Array(new ArrayBuffer(512)), new Uint16Array(new ArrayBuffer(256)),
    new Uint16Array(new ArrayBuffer(128)), new Uint16Array(new ArrayBuffer(64)),
    new Uint16Array(new ArrayBuffer(32)), new Uint16Array(new ArrayBuffer(16)),
    new Uint16Array(new ArrayBuffer(8)), new Uint16Array(new ArrayBuffer(4))];
  for (i = arr.length - 1; i > -1; i -= 1) {
    res[i] = 0;
    for (d = 0, n = arr[i] + 1024; d < 11; d += 1, n >>= 1) {
      counts[d][n] += 1;
      if (n & 1) res[i] += counts[d][n-1];
    }
  }
  return res;
}
