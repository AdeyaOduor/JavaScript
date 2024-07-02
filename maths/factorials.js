// product of all positive integers less than or equal to x
function factorial(x, runningTotal = 1 ) {
   return x == 0 ? runningTotal : factorial( x-1, x*runningTotal);
}

console.log(factorial(10)) // output 3628800
------------------------------------------------------------------------------
// recursive
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

console.log(factorialize(5)); // 120

/* Notice at the first line we have the terminal condition, i.e a condition to check the end of the recursion. 
If num == 0, then we return 1, i.e. effectively ending the recursion and informing the stack to propagate this 
value to the upper levels. If we do not have this condition, the recursion would go on until the stack space gets 
consumed, thereby resulting in a Stack Overflow */
/**
 * Calculates the factorial of a given number.
 * @param {number} n - The number to calculate the factorial for.
 * @returns {number} The factorial of the given number.
 */
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Example usage
const numFriends = 5;
const numPermutations = factorial(numFriends);

console.log(`There are ${numPermutations} possible ways to arrange the ${numFriends} friends in a line.`);
