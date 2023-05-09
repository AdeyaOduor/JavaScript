// product of all positive integers less than or equal to x

function factorial(x, runningTotal = 1 ) {
   return x == 0 ? runningTotal : factorial( x-1, x*runningTotal);
}

console.log(factorial(10))

// recursive
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

factorialize(5);

/* Notice at the first line we have the terminal condition, i.e a condition to check the end of the recursion. 
If num == 0, then we return 1, i.e. effectively ending the recursion and informing the stack to propagate this 
value to the upper levels. If we do not have this condition, the recursion would go on until the stack space gets 
consumed, thereby resulting in a Stack Overflow */
