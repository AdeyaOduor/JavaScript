function sumDigPow(a, b) {
  // Initialize an empty array to store the result
  l = [];

  // Iterate through the range from a to b
  for (i = a; i <= b; i++) {
    // Convert the current number i to a string
    s = i + "";

    // Initialize a variable to store the sum of powered digits
    c = 0;

    // Iterate through the digits of the current number
    for (j = 0; j < s.length; j++) {
      // Calculate the contribution of the current digit
      // by raising it to the power of its position (j+1)
      c += Math.pow(s.charCodeAt(j) - 48, j + 1);
    }

    // Check if the sum of powered digits is equal to the original number
    if (c == i) {
      // If true, add the current number to the result array
      l.push(i);
    }
  }

  // Return the result array
  return l;
}
