//The spiralize function generates a 2D array (matrix) that represents a spiral pattern of 1s and 0s. 
// The function works recursively and produces different spiral shapes based on the input size.

function spiralize(size) {
  if (size == 2) return [ [1,1], [0,1] ]; // Base case for size 2
  if (size == 3) return [ [1,1,1], [0,0,1], [1,1,1] ]; // Base case for size 3

  var base = spiralize(size - 2); // Recursive call to build the smaller spiral
  var res = [[], []]; // Initialize result matrix

  // Fill the first two rows of the result
  for (var i = 0; i < size; i++) {
    (res[0].push(1)) && (res[1].push(0)); // First row filled with 1s, second with 0s
  }
  res[1][size - 1] = 1; // Set the last element of the second row to 1

  // Build the spiral for the rest of the matrix
  for (var i = size - 3; i >= 0; i--) {
    res.push(base[i].reverse().concat([0, 1])); // Reverse and append rows from the smaller spiral
  }
  
  res[size - 1][size - 2] = 1; // Set the second last element of the last row to 1
  return res; // Return the completed spiral
}

console.log(spiralize(5));
