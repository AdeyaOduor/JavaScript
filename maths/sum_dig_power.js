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

console.log(sumDigPow(1, 100));

/*
    The function sumDigPow takes two parameters, a and b, which represent the range of numbers to be checked.
    An empty array l is initialized to store the numbers that satisfy the condition.
    The function then iterates through the range from a to b using a for loop.
    For each number i in the range, it is converted to a string s.
    A variable c is initialized to store the sum of the powered digits.
    Another for loop is used to iterate through the digits of the current number i.
    For each digit, the function calculates its contribution by raising it to the power of its position (starting from 1) using the Math.pow() function.
    The contribution of each digit is added to the c variable.
    After the loop, the function checks if the sum of the powered digits (c) is equal to the original number i.
    If the condition is true, the current number i is added to the l array.
    Finally, the function returns the l array containing the numbers that satisfy the condition.

The purpose of this function is to find all the numbers in the given range [a, b] where the sum of the digits raised to their respective positions is 
equal to the original number. These numbers are often referred to as "narcissistic" or "Armstrong" numbers.
For example, if you call sumDigPow(1, 100), the function will return an array containing the numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 89], as these are the 
only numbers in the range [1, 100] that satisfy the given condition.*/
